import React, { Component } from "react";
import { Modal} from "react-bootstrap";
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


export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: null,
      file: null,
      showPopup: false,
      error: false,
      sheets : [],
      sheetsLoading: false,
      showModal: false
    };
  }

  validateForm() {
    if(this.state.file !== null && typeof(this.state.file) !== "undefined"){
      return true;
    }
    return false;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
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

    this.getSheets()
    
    document.getElementById("the-nav").style.background = "#4594E9";
      
  
  }

  getSheets = async () =>{
  
      this.setState({ sheetsLoading: true });
    
    try {
      let sheets;

      let t0 = await performance.now();
      await API.get('getSheets', '/').then(response => {
        sheets = response
        console.log(response)
    }).catch(error => console.log("there was an error", error))

    

      await this.setState({ sheets });
      let t1 = performance.now();
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    } catch (e) {
      alert(e);
    }
  
    
    this.setState({ sheetsLoading: false });
  }



  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.state.file && this.state.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isSubmitting: true });
  
    try {
      let name;
      let userId;

      const attachment = this.state.file
        ? await s3Upload(this.state.file).then(response => {
          name = response
        })
        : null;

    
        await Auth.currentUserCredentials().then(
          res => {
            userId = res.data.IdentityId
          }
        )

      const params = {
        body: {
          name,
          bucket: "excel-sheets-storage",
          userId
        }
      }
      await API.post('postSheet', '/', params).then(response => {
        console.log(response.body);
        if(this.state.sheets === null){ // sheets are empty
          this.setState({sheets : [response.body]})
        }
        else{ // sheets array not empty
          this.setState({ sheets: [...this.state.sheets, response.body] })
        }
        
      })

      this.setState({isSubmitting: false, error: false})


    } catch (e) {
      alert(e);
      console.log("there was an error")
      this.setState({ isSubmitting: false, error: true});
    }


    document.getElementById('drop-form').reset();
    this.setState({showPopup: true, file: null})

    // add a timer for the popup
    setTimeout(function(){
      this.setState({showPopup:false});
      }.bind(this),2500);
    
    }


  render() {
    document.body.style.background = "white";
    let popup;
      
      if(!this.state.error){
        popup = <Popup
          content = {"File upload successful"}
          color = {"green"}
          />
      }
      else{
        popup = <Popup
                    content = {"There was an error in uploading the file"}
                    color = {"red"}
                    />
      }

    return (

        <div className = "logs">
      
        

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <UploadModal close = {this.handleModalClose}>
          <form onSubmit={this.handleSubmit} id = "drop-form">
        
        <input type="file" onChange={this.handleFileChange}/>
        <LoaderButton
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isSubmitting}
          text="Submit"
          loadingText="Submitting…"
        />
      </form>

          </UploadModal>
        </Modal>

        <div className = "sheets">
        <h1>Logs<img src = {logsIcon}/></h1>
        <hr/>
          <button className = "select-date-btn"><img src = {calendarIcon} style = {{marginRight: "7px"}}/>Select a Date Range<img src = {downArrow} style = {{marginLeft: "7px", height: "10px", width: "auto"}}/></button>
        <button className = "sort-btn">Sort By<img src = {downArrow}  style = {{marginLeft: "7px", height: "10px", width: "auto"}}/></button>
        <button className = "upload-btn" onClick = {this.handleModalShow}><img src = {uploadIcon}/>Upload File<img/></button>

        <Table  loading = {this.state.sheetsLoading} sheets = {this.state.sheets} /></div>
      </div>
    );
  }
}