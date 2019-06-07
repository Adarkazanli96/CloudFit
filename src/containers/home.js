import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Home.css";
import { s3Upload } from "../libs/awsLib";
import Popup from '../components/Popup'
import { Auth, API } from 'aws-amplify';
import Sheets from './Sheets'



export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      file: null,
      showPopup: false,
      error: false,
      sheets : null,
      sheetsLoading: true
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
      this.file = event.target.files[0];
      this.setState({file: event.target.files[0]})
  }

  async componentDidMount(){
    this.getSheets()
  }

  getSheets = async () =>{
    
      //this.setState({ sheetsLoading: true });
    
    try {
      let sheets;

      await API.get('sheets', '/').then(response => {
        console.log("this is the response from the api: " + response)
        sheets = response
    })
      this.setState({ sheets });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ sheetsLoading: false });
  }



  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      const attachment = this.file
        ? await s3Upload(this.state.file)
        : null;

        this.setState({isLoading: false, error: false, sheetsLoading: true})
        //this.getSheets();
        
      //this.props.history.push("/");
    } catch (e) {
      alert(e);
      console.log("there was an error")
      this.setState({ isLoading: false, error: true});
    }

    document.getElementById('drop-form').reset();
    this.setState({showPopup: true, file: null})
    this.file = null;

    // add a timer to popup
    setTimeout(function(){
      this.setState({showPopup:false});
      }.bind(this),2500);
    
      setTimeout(function(){
        this.getSheets();
        }.bind(this),3500);
    
}
  

  


  render() {

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

      console.log("state of the sheets in render " + this.state.sheets)

    return (
      
      <div className = "upload-form">
        <form onSubmit={this.handleSubmit} id = "drop-form">
        
        <div className="file-drop-area">
        {this.state.showPopup ? popup : null}
          <span className="fake-btn" >Choose file</span>
          <span className="file-msg">{this.state.file === null || typeof(this.state.file) === "undefined"? "or drag and drop files here" : this.state.file.name}</span>
          <input className="file-input" type="file" onChange={this.handleFileChange}/>
        </div>

        <LoaderButton
      style = {{marginTop: "7px"}}
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Submit"
            loadingText="Submitting…"
          />
        </form>
        {this.state.sheetsLoading ? <div className = 'loader'></div> : <Sheets sheets = {this.state.sheets} />}
        
      </div>
    );
  }
}
