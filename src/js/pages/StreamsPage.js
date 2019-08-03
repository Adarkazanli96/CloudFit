
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
        data: {},
        input: null,
    };

  }
   
  async componentDidMount(){
    this.maintainWSConnection = true;
    this.connectWebSocket()

    this.getAllDevices();

    document.getElementById("the-nav").style.background = "#4594E9";
  }

  componentWillUnmount(){
    this.maintainWSConnection = false;
    this.client.close()
  }

  connectWebSocket = () => {
    let that = this;

    this.client = new W3CWebSocket('wss://vwqdp14cx5.execute-api.us-east-1.amazonaws.com/dev/', null, null, { "x-api-key": "hRQzyXRDSva1cuXolJeP2aDGuL26g4zl641suxx6" });

    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
      let json = { "action": "setClientType", "clientType": "web" };
      this.client.send(JSON.stringify(json))
    };

    this.client.onmessage = (message) => {
      //console.log(JSON.parse(message.data));
      if(JSON.parse(message.data).data){
        let samples = JSON.parse(message.data).data.Samples
        let timestamp = JSON.parse(message.data).data.Timestamp
        let serial = JSON.parse(message.data).device.serial
        this.addDataToGraph(samples, timestamp, serial)
      }
    };

    this.client.onclose = (e) => {
      console.log('Socket is closed');
      if(this.maintainWSConnection){
      setTimeout(function(){
          that.connectWebSocket()
      }, 5000);
    }}
  }

  addDataToGraph = (samples, timestamp, serial) =>{
    let temp = [];

    // transform the data
    for(let i = 0; i<samples.length; i++){
      temp.push([parseFloat(timestamp)+(i*7.8125),samples[i]])
    }
    
    this.setState({
      data: {
         ...this.state.data,
         [serial]: [
            ...this.state.data[serial],
            ...temp]
         }
      }
  );
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }

  getAllDevices = async () => {
    try {
      await API.get('Movesense', '/devices').then(response => {
        console.log(response)

        //convert to associative
        let data = {}
        response.forEach(res => {
          data[res.serial.toString()] = []
        })

        //console.log(arr)
        this.setState({data: data})

      })
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
         //console.log(response); 
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

  mapChart = () =>{
    return Object.keys(this.state.data).map((serial, index) => {
      return <LineChart key = {serial} serialNumber = {serial} data = {this.state.data[serial]}/>
    })

  }

  render() {

    //console.log(this.state.data)
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
            {this.mapChart()}
          </div>
      
        </div>
    );
  }
}