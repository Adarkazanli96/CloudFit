
import React, {Component} from 'react'

import { API } from 'aws-amplify';

import "../../css/pages/StreamsPage.css";

import Sockette from 'sockette'

import LineChart from '../components/Reusables/HighChart'

import streamsIcon from '../../assets/images/page_headers/streams.png'

import {OverlayTrigger, Popover, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

import { w3cwebsocket as W3CWebSocket } from "websocket";

let client;

function connect() {
  console.log('Connecting...')
  client = new W3CWebSocket('wss://vwqdp14cx5.execute-api.us-east-1.amazonaws.com/dev/', null, null, { "x-api-key": "hRQzyXRDSva1cuXolJeP2aDGuL26g4zl641suxx6" });
}

export default class LogsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        records: [
            {
                x:0,
                y:0
            },
        ],
        count: 0,
        min: 0,
        max: 4,
        firstVal: null,
        date: null,
        input: null
    };

    
}
   
   
  async componentDidMount(){

    connect()

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      let json = { "action": "setClientType", "clientType": "web" };
      client.send(JSON.stringify(json))
    };

    client.onmessage = (message) => {
      console.log(message);
      this.receivedMessage(message)
    };

    client.onclose = (e) =>{
      console.log('Socket is closed. Reconnect well be attempted shortly');
      connect();
    }

    //this.getAllDevices();

    document.getElementById("the-nav").style.background = "#4594E9";

}


  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }

  getAllDevices = async () =>{
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
      } catch (e) {
        alert(e);
        console.log("there was an error")
      }
    }

  componentWillUnmount(){
    clearInterval(this.interval);
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



  receivedMessage = (event) =>{
   
    //store the first value of incoming records
    if(this.state.firstVal === null){
      console.log(JSON.parse(JSON.parse(event.data)).data.Timestamp)
      let date = new Date(JSON.parse(JSON.parse(event.data)).data.Timestamp)
      date = date.toString();
      this.setState({firstVal: JSON.parse(JSON.parse(event.data)).data.Timestamp, date: date})
    }

    console.log(JSON.stringify(JSON.parse(JSON.parse(event.data)).data))
    // get the timestamp of batch
    let ts = JSON.parse(JSON.parse(event.data)).data.Timestamp
    let arr = JSON.parse(JSON.parse(event.data)).data.Samples
    let arr2 = []
    for(let i = 0; i<arr.length; i++){
      arr2.push({
        time: (ts+(i*7.8125) - this.state.firstVal)/1000,
        heartrate:arr[i]
      }
        
  )
    }
    //console.log((ts - this.state.firstVal)/1000)

    this.setState({records: this.state.records.concat(arr2)})
    
    // if the ts of the most recently inserted array exceeds 3 seconds
    if(((ts - this.state.firstVal)/1000) >= this.state.max){
      this.setState({min: this.state.min+0.125})
      this.setState({max: this.state.max+0.125})
    }
    
  }

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
        

      <div style= {{margin: "0 auto", width: "500px"}}>
        <LineChart min = {this.state.min} max = {this.state.max} data = {this.state.records}/>
      </div>
          {/*<LineChart min = {this.state.min} max = {this.state.max} labels = {this.state.labels} records = {this.state.records}/>*/}

      </div>
      
        </div>
    );
  }
}