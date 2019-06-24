import React, { Component, lazy, Suspense } from "react";
import { Modal, Glyphicon} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import SubmitBar from '../components/LoadingBar'
import config from "../config";
import "./LogsPage.css";
import { s3Upload } from "../libs/awsLib";
import Popup from '../components/Popup'
import { Auth, API } from 'aws-amplify';

import Table from './Table'
import UploadModal from '../components/UploadModal'


import uploadIcon from '../assets/images/upload-icon.png'
import calendarIcon from '../assets/images/calendar.png'
import downArrow from '../assets/images/down-arrow.png'

import logsIcon from '../assets/images/logs.png'

import SelectedLog from '../components/SelectedLog'

//const Table = lazy(() => import('./Table'))


export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: null,
      file: null,
      showPopup: false,
      error: false,
      logs : [],
      loading: false,
      showModal: false,
      selectedLog: null,
      gettingSelectedLog: false
    };
  }

  validateForm() {
    if(this.state.file !== null && typeof(this.state.file) !== "undefined"){
      return true;
    }
    return false;
  }


  setSelectedLogHandler = (value) =>{
    this.setState({gettingSelectedLog: true, showPopup: false})
    this.getLog(value);
  }


  handleFileChange = event => {
      this.setState({file: event.target.files[0]})
  }

  handleModalClose = () =>{
    this.setState({showModal: false})
  }

  handleModalShow = () =>{
    this.setState({showModal: true})
  }

  async componentDidMount(){

    this.getAllLogs()
    
    document.getElementById("the-nav").style.background = "#4594E9";
      
  
  }

  getAllLogs = async () =>{
  
      this.setState({ loading: true });
    
    try {
      let logs;

      let t0 = await performance.now();
      await API.get('getSheets', '/').then(response => {
        logs = response
    }).catch(error => console.log("there was an error", error))

    

      await this.setState({ logs });
      let t1 = performance.now();
      console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    } catch (e) {
      alert(e);
    }
  
    
    this.setState({ loading: false });
  }

  clearSelectedLog = () =>{
    this.setState({selectedLog: null})
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.state.file && this.state.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isSubmitting: true, showPopup: false });
  
    try {
      let name;
      let userId;

      this.handleModalClose();

      const attachment = this.state.file
        ? await s3Upload(this.state.file).then(response => {
          name = response
        })
        : null;

    
        await Auth.currentUserCredentials().then(
          res => {
            userId = res.data.IdentityId
            console.log(userId)
          }
        )

      const params = {
        body: {
          name,
          bucket: "excel-sheets-storage",
          userId
        }
      }
      await API.post('CloudFit', '/', params).then(response => {
       // console.log(response.body);
        response.body.isAdded = true;
        if(this.state.logs === null){ // logs are empty
          this.setState({logs : [response.body]})
        }
        else{ // logs array not empty
          this.setState({ logs: [...this.state.logs, response.body] })
        }
        
      })

      this.setState({isSubmitting: false, error: false})


    } catch (e) {
      alert(e);
      console.log("there was an error")
      this.setState({ isSubmitting: false, error: true});
    }

    //document.getElementById('drop-form').reset();
    this.setState({showPopup: true, file: null})

    // add a timer for the popup

    }

    handleFileChange = event => {
      this.setState({file: event.target.files[0]})
  }

    getLog = async (id) =>{
      
      let selectedLog;
      try {
  
        
        await API.get('CloudFit', `/logs/${id}`).then(response => {
          selectedLog = response;
  
        }).catch(error => console.log("there was an error", error))
  
      } catch (e) {
        alert(e);
      }

      console.log("before set state", selectedLog)

      this.setState({selectedLog, gettingSelectedLog: false})
    }

    dismissAlertHandler = () =>{
      this.setState({showPopup: false})
    }


  render() {

    document.body.style.background = "white";
    let popup;
      
      if(!this.state.error){
        popup = <Popup
        close = {this.dismissAlertHandler}
          content = {"File upload successful"}
          color = {"green"}
          />
      }
      else{
        popup = <Popup
        close = {this.dismissAlertHandler}

                    content = {"There was an error in uploading the file"}
                    color = {"red"}
                    />
      }

      console.log("rerendering")

    return (

        <div className = "logs-page">
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <UploadModal close = {this.handleModalClose}>
          <form onSubmit={this.handleSubmit} id = "drop-form">
        
          <input type="file" onChange={this.handleFileChange}/>

          <LoaderButton
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          text="Submit"
          />
          </form>

        </UploadModal>
        </Modal>
        <div className = "logs-container">
        {this.state.showPopup? <div>{popup}</div> : null}
        <h1>Logs<img src = {logsIcon}/></h1> 
        <hr/>
        
        
        <div style = { this.state.selectedLog || this.state.gettingSelectedLog? {visibility: "hidden", position: "absolute"} : {}}>

          {/*sort by and date range button */}
          <button className = "select-date-btn"><img src = {calendarIcon} style = {{marginRight: "7px"}}/>Select a Date Range<img src = {downArrow} style = {{marginLeft: "7px", height: "10px", width: "auto"}}/></button>
          <button className = "sort-btn">Sort By<img src = {downArrow}  style = {{marginLeft: "7px", height: "10px", width: "auto"}}/></button>

          {/* upload file button*/}
          {!this.state.isSubmitting? <button className = "upload-btn" onClick = {this.handleModalShow}><img src = {uploadIcon}/>Upload File<img/></button> : 
          <button className = "upload-btn-submitting"><Glyphicon glyph="refresh" className="spinning"/>Submitting</button>}
          
          {/* table */}
            <Table onSelect = {this.setSelectedLogHandler} loading = {this.state.loading} logs = {this.state.logs} />
        </div>
          
          {this.state.gettingSelectedLog? <div><div className = "spinner-container"><div className="lds-ellipsis"><div></div>LOADING<div></div><div></div><div></div></div></div></div> : null}
          {this.state.selectedLog? <SelectedLog back = {this.clearSelectedLog} selected = {this.state.selectedLog} /> : null}
        
        </div>
      </div>
    );
  }
}
