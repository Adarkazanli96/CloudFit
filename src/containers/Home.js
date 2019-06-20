import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Media, Row, Col, Modal} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Home.css";
import { s3Upload } from "../libs/awsLib";
import Popup from '../components/Popup'
import { Auth, API } from 'aws-amplify';
import Sheets from './Sheets'
import Table from './Table'
import UploadModal from '../components/UploadModal'

import cloud from '../assets/images/cloud-upload.png'
import runner from '../assets/images/running.png'
import share from '../assets/images/share.png'
import image1 from '../assets/images/1.jpg'
import image2 from '../assets/images/2.jpg'
import image3 from '../assets/images/3.jpg'
import image4 from '../assets/images/4.jpg'
import image5 from '../assets/images/6.jpg'
import uploadIcon from '../assets/images/upload-icon.png'
import Signup from '../containers/Signup'


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

    window.scrollTo(0, 0)


    if (!this.props.isAuthenticated) {
      //document.getElementById("the-nav").style.transition = "background-color 500ms ease"
      window.addEventListener('scroll', this.changeNavColor);
      return;
    }

    this.getSheets()
    

    

    if(this.props.isAuthenticated === true){
      document.getElementById("the-nav").style.background = "#4594E9";
    }

    
  
  }

  changeNavColor = () =>
    {
      if (window.scrollY > 30) {
      document.getElementById('the-nav').style.background = 'rgba(0, 0, 0, 0.8)'
    }
    else{
      document.getElementById('the-nav').style.background = "transparent";
    }
  }  


  async componentWillReceiveProps(nextProps){
    console.log("in component will recieve props")
    
    // going from authenticated is false to true
    if(nextProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated === false){
      //document.getElementById("the-nav").style.transition = "none"
      window.scrollTo(0, 0) // scroll to top of page
      document.getElementById("the-nav").style.background = "#4594E9";
      window.removeEventListener('scroll', this.changeNavColor);


      await this.getSheets();
      
    }
    
    else if(nextProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated === true){
      // scroll to top of page
      //document.getElementById("the-nav").style.transition = "background-color 500ms ease"
      window.scrollTo(0, 0)
      document.getElementById("the-nav").style.background = "transparent";
      window.addEventListener('scroll', this.changeNavColor);


    }

  }

  getSheets = async () =>{
  
      this.setState({ sheetsLoading: true });
    
    try {
      let sheets;

      let t0 = await performance.now();
      await API.get('getSheets', '/').then(response => {
        sheets = response
        console.log(response)
    })

    

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
  
    renderLander(){

      document.body.style.background = "black";
      return (
        <div className="lander">
            <div id= "crossfade">
              <img src={image1} />
              <img src={image2} />
              <img src={image3} />
              <img src={image4} />
              <img src={image5} />
            </div>
          <Row className = "row1">
            <Col md = {6} sm = {8}>
              <div className = "welcome">
                <h1>Welcome To CloudFit</h1>
                <p>A simple way to track workouts</p>
                  <ul>
                    <li><img src = {cloud}/><span style = {{fontWeight: "normal"}}>Upload</span> your workout sheets</li>
                    <li><img src = {runner}/><span style = {{fontWeight: "normal"}}>Track</span> your progress</li>
                    <li><img src = {share}/><span style = {{fontWeight: "normal"}}>Share</span> and compare results</li>
                  </ul>
              </div>
            </Col>
            <Col md = {6} sm = {4}>
              <Signup {...this.props} />
            </Col>
          </Row>
      </div>
      );
    }
  
    renderSheets(popup) {
    document.body.style.background = "white";

      return (
        <div className = "dashboard">
      
        

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
        <h2>Logging</h2>
        <hr/>
          <button className = "select-date-btn">SELECT A DATE RANGE TO SEARCH</button>
        <button className = "sort-btn">SORT BY</button>
        <button className = "upload-btn" onClick = {this.handleModalShow}><img src = {uploadIcon}/>Upload File<img/></button>

        <Table  loading = {this.state.sheetsLoading} sheets = {this.state.sheets} /></div>
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
