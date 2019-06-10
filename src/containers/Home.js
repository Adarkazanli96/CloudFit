import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Home.css";
import { s3Upload } from "../libs/awsLib";
import Popup from '../components/Popup'
import { Auth, API } from 'aws-amplify';
import Sheets from './Sheets'
import logo from '../assets/images/logo.png'
import image1 from '../assets/images/1.jpg'
import image2 from '../assets/images/2.jpeg'
import image3 from '../assets/images/3.jpg'
import image4 from '../assets/images/4.jpg'
import image5 from '../assets/images/5.jpg'
import Signup from '../containers/Signup'
//import { ReactComponent as Logo } from '../assets/images/logo.png'



export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: null,
      file: null,
      showPopup: false,
      error: false,
      sheets : [],
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
      this.setState({file: event.target.files[0]})
  }

  async componentDidMount(){
    if (!this.props.isAuthenticated) {
      return;
    }
    this.getSheets()
  }

  getSheets = async () =>{
    
      //this.setState({ sheetsLoading: true });
    
    try {
      let sheets;

      await API.get('getSheets', '/').then(response => {
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
  

    renderLander(){
      return (
        <div className="lander">
          <div className = "welcome"><h1 style = {{display: "inline"}}>Welcome to CloudFit</h1>
          <p>A simple way to track workouts</p></div>
          <div id= "crossfade" class="shadow">
            <img src={image1} />
            <img src={image2} />
            <img src={image3} />
            <img src={image4} />
            <img src={image5} />
          </div>
            
          <div  className = "sp"><Signup/></div>
          
          
        </div>
      );
    }
  
    renderSheets(popup) {
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
            isLoading={this.state.isSubmitting}
            text="Submit"
            loadingText="Submitting…"
          />
        </form>
        {this.state.sheetsLoading ? <div className = 'loader'></div> : <Sheets sheets = {this.state.sheets} />}
        
      </div>
      );
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

    return (
        <div className = "Home">
          {this.props.isAuthenticated ? this.renderSheets(popup) : this.renderLander()}
        </div>
    );
  }
}