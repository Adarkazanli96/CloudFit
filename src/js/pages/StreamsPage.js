
import React, {Component} from 'react'
import { API } from 'aws-amplify';
import LineChart from '../components/Reusables/StockChart'
import streamsIcon from '../../assets/images/page_headers/streams.png'
import {OverlayTrigger, Popover, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../../css/pages/StreamsPage.css";


export default class LogsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        records: [],
        count: 0,
        input: null
    };
  
  }
   
  async componentDidMount(){
    this.connectWebSocket()

    //this.getAllDevices();

    document.getElementById("the-nav").style.background = "#4594E9";
  }



  connectWebSocket = () => {
    let that = this;

    let client = new W3CWebSocket('wss://vwqdp14cx5.execute-api.us-east-1.amazonaws.com/dev/', null, null, { "x-api-key": "hRQzyXRDSva1cuXolJeP2aDGuL26g4zl641suxx6" });

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      let json = { "action": "setClientType", "clientType": "web" };
      client.send(JSON.stringify(json))
    };

    client.onmessage = (message) => {
      console.log(JSON.parse(message.data));
      if(JSON.parse(message.data).data){
        let samples = JSON.parse(message.data).data.Samples
        let timestamp = JSON.parse(message.data).data.phoneTimestamp
        this.addDataToGraph(samples, timestamp)
      }
    };

    client.onclose = (e) => {
      console.log('Socket is closed. Reconnect well be attempted shortly');
      setTimeout(function(){that.start()}, 5000);
    }
  }

  addDataToGraph = (samples, timestamp) =>{
    let temp = [];

    // transform the data
    for(let i = 0; i<samples.length; i++){
      temp.push([parseFloat(timestamp)+(i*7.8125),samples[i]])
    }
    console.log(temp)
    this.setState({records: [...this.state.records, ...temp]})

  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }

  getAllDevices = async () => {
    this.setState({ loading: true });
    
    try {
      await API.get('CloudFit', '/devices').then(response => {
      console.log(response)
      }
      )
      .catch(error => console.log("there was an error", error))
    } catch (e) {
      alert(e);
    }

  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const params = {
        body: {
          serial: this.state.input
        }
      }
      await API.post('Movesense', '/devices', params).then(response => {
         console.log(JSON.stringify(response)); 
      })  
    }catch (e) {
        alert(e);
        console.log("there was an error")
      }
  }


  popover = (
      <Popover>
        <Form inline onSubmit={this.handleSubmit} autocomplete="off">
            <FormGroup controlId="formInlineName">
                <ControlLabel>Serial # </ControlLabel>{' '}
                <FormControl type="text" placeholder="#000000000000" onChange = {this.handleChange}/>
            </FormGroup>
        <Button type="submit">Add</Button>
        </Form>  
    </Popover>
  )


  render() {

    return (
        <div className = "streams-page">
          
          <div className = "streams-container">
            {this.state.showPopup? this.showPopupHandler() : null}
            <h1>Streams<img src = {streamsIcon}/></h1> 
            <hr/>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="bottom"
              overlay={this.popover}
            >
            <Button>+ Add Device</Button>
            </OverlayTrigger>
            <div><LineChart data = {this.state.records}/></div>
          </div>
      
        </div>
    );
  }
}