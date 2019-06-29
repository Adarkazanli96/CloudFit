import React, { Component, lazy, Suspense } from "react";
import { Modal, Glyphicon} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
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

import backIcon from '../assets/images/back-icon.png'

import trashIcon from '../assets/images/trash.png'
import bookmarkIcon from '../assets/images/bookmark.png'


import ReactTable from './ReactTable'


export default class LogsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: null,
      file: null,
      logs : [],
      loading: false,
      showModal: false,
      selectedLog: null,
      showTable: true,
      
      showPopup: false,
      error: false,
      popupContent: null,
    };
  }


  validateForm() {
    if(this.state.file !== null && typeof(this.state.file) !== "undefined"){
      return true;
    }
    return false;
  }


  // controls for each individual entry
  setSelectedLogHandler = async (log) =>{
    this.setState({showTable: false, showPopup: false})
    await this.getLog(log._id);
    if(log.recentlyAdded === true){
      let logs = [...this.state.logs];
      const index = logs.map(e => e._id).indexOf(log._id)
      logs[index].recentlyAdded = false
      this.setState({logs})
      console.log("clearing recent tab")
    }
    
    
  }


  // selected log component controls
  clearSelectedLog = () =>{
    this.setState({showTable: true, selectedLog: null})
  }


  // table component controls
  handleFileChange = event => {
      this.setState({file: event.target.files[0]})
  }

  handleModalClose = () =>{
    this.setState({showModal: false})
  }

  handleModalShow = () =>{
    this.setState({showModal: true})
  }

  showMenu = (event) =>{
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
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

      this.handleModalClose();

      const attachment = this.state.file
        ? await s3Upload(this.state.file).then(response => {
          name = response
        })
        : null;

      const params = {
        body: {
          name,
          bucket: "excel-sheets-storage",
          userId: "us-east-1:206e4858-adef-4cb9-9520-7de2247ccbef"
        }
      }
      await API.post('CloudFit', '/', params).then(response => {
       console.log(response.body);
        response.body.recentlyAdded = true;
        if(this.state.logs === null){ // logs are empty
          this.setState({logs : [response.body]})
        }
        else{ // logs array not empty
          this.setState({ logs: [...this.state.logs, response.body] })
        }
        
      })

      this.setState({isSubmitting: false, error: false, popupContent: "File upload successful!"})


    } catch (e) {
      alert(e);
      console.log("there was an error")
      this.setState({ isSubmitting: false, error: true, popupContent: "An error occured"});
    }

    //document.getElementById('drop-form').reset();
    this.setState({showPopup: true, file: null})

    // add a timer for the popup

    }



    mapFromArray = (list , keyByProp) => {
      let map = [];
      for (let i=0, item; item = list[i]; i++) {
          map[item[keyByProp]] = item;
      }
      return map;
    };

    convertToIndexArr = (logs) =>{
      let numeric_array = [];
      console.log("invoking func")
      for(let index in logs){
        //console.log(index);
        //console.log(logs[index])
        numeric_array.push(logs[index]);
      }
    return numeric_array
    }
  // API calls

  getAllLogs = async () =>{
    this.setState({ loading: true });
    
    try {
      let logs;

      let t0 = await performance.now();
      await API.get('CloudFit', '/logs').then(response => {
        logs = response
        //this.mapFromArray(response, "_id")
        //this.convertToIndexArr(logs)
      }
        )
      .catch(error => console.log("there was an error", error))

      this.setState({ logs });
      let t1 = performance.now();
      console.log("Call to get all logs took " + (t1 - t0) + " milliseconds.")
    } catch (e) {
      alert(e);
    }
    this.setState({ loading: false });
  }
  
  getLog = async (id) =>{
    let selectedLog;
      
    try {
      await API.get('CloudFit', `/logs/${id}`).then(response => {
      selectedLog = response;
      }).catch(error => {
      console.log("there was an error", error)
      this.setState({showTable : true})})
    } catch (e) {
        alert(e);
    }

    this.setState({selectedLog})
    }

    handleDelete = async (id) =>{

      const confirmed = window.confirm(
        "Are you sure you want to delete this note?"
      );

      if (!confirmed) {
        return;
      }
        
      try {
        
        
        let logs = [...this.state.logs];
        const index = logs.map(e => e._id).indexOf(id)
        logs.splice(index, 1)
        this.setState({logs})

        API.del('CloudFit', `/logs/${id}`)
        
        this.clearSelectedLog();
        
        
        //this.getAllLogs();

        this.setState({error: false, popupContent: "File successfully deleted!",})

        
      } catch (e) {
          alert(e);
          this.setState({error: true, popupContent: "An error occured"})

      }
      this.setState({showPopup: true})
  
      }
    

  bookmarkLog = async (id) =>{
    console.log("ivoking bookmark log function")
    

    try{
      let logs = [...this.state.logs];
      const index = logs.map(e => e._id).indexOf(id)
      logs[index].bookmark = !logs[index].bookmark
      this.setState({logs})

      const params = {
        body: {
            bookmark: logs[index].bookmark,
        }
      }

      await API.put('CloudFit', `/logs/${id}`, params).then(response => {
      console.log(response);
    }).catch(err =>{
      console.log("there was an error", err)
    })
    }
    catch(e){
      alert(e)
    }
    
  }

  dismissAlertHandler = () =>{
    this.setState({showPopup: false})
  }

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  clearRecentTab = (id) =>{
    
    let logs = [...this.state.logs];
      const index = logs.map(e => e._id).indexOf(id)
      if(logs[index].recentlyAdded === true){
      logs[index].recentlyAdded = false}
      this.setState({logs})
    
    /*let logs = [...this.state.logs];
    logs.forEach(log =>{
    if(log._id === id && log.recentlyAdded === true){
        log.recentlyAdded = false
        this.setState({logs})
    }
       
    })
    /*let i = logs.findIndex(log => log._id = id)
    logs[i].recentlyAdded = false
    this.setState({logs})*/
    
   }

   renderTable(){     
     return(
    <div style = {this.state.showTable? {} : {display: "none"}}>

    {/*sort by and date range button */}
    <div className = "btn-container">
    <button className = "select-date-btn"><img src = {calendarIcon} style = {{marginRight: "7px"}}/>Select a Date Range<img src = {downArrow} style = {{marginLeft: "7px", height: "10px", width: "auto"}}/></button>
    

    {/* upload file button*/}
    {!this.state.isSubmitting? <button className = "upload-btn" onClick = {this.handleModalShow}><img src = {uploadIcon}/>Upload File<img/></button> : 
    <button className = "upload-btn-submitting"><Glyphicon glyph="refresh" className="spinning"/>Submitting</button>}
    </div>
    
    {/* table */}
    <ReactTable select = {this.setSelectedLogHandler} logs = {this.state.logs}/>

      
    
      {/*<Table onSelect = {this.setSelectedLogHandler} sort = {this.state.sortOptions} onDelete = {this.deleteLog} loading = {this.state.loading} logs = {this.state.logs} />*/}
  </div>)
   }

   renderSelectedEntry(){
     return(<div style = {!this.state.showTable? {} : {display: "none" }}>
       <div className = "btn-container">
        <button className = "back-btn" onClick = {this.clearSelectedLog}><img src = {backIcon}/>Back</button>
        <button className = "delete-btn" onClick = {() => this.handleDelete(this.state.selectedLog._id)}><img src = {trashIcon}/></button>
        <button className = "bookmark-btn" onClick = {() => this.bookmarkLog(this.state.selectedLog._id)}><img src = {bookmarkIcon}/></button>
  </div>
       {!this.state.selectedLog? <div><div className = "spinner-container"><div className="lds-ellipsis"><div></div>LOADING<div></div><div></div><div></div></div></div></div> : 
      <SelectedLog selected = {this.state.selectedLog} /> }
     </div>)

   }
   
   
  async componentDidMount(){
    this.getAllLogs()
    document.getElementById("the-nav").style.background = "#4594E9"; 
  }

  showPopupHandler = (type, content)=>{

        return <Popup
        close = {this.dismissAlertHandler}
                    content = {this.state.popupContent}
                    color = {this.state.error? "red" : "green"}
                    />

  }


  render() {

    document.body.style.background = "white";

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
        {this.state.showPopup? this.showPopupHandler() : null}
        <h1>Logs<img src = {logsIcon}/></h1> 
        <hr/>
        
        {this.renderSelectedEntry()}
        {this.renderTable()}

         
        
        </div>
      </div>
    );
  }
}
