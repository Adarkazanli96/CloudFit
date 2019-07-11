import React, { Component } from "react";
import {Row, Col} from "react-bootstrap";


import image1 from '../../assets/images/stock_backgrounds/1.jpg'
import image2 from '../../assets/images/stock_backgrounds/2.jpg'
import image3 from '../../assets/images/stock_backgrounds/3.jpg'
import image4 from '../../assets/images/stock_backgrounds/4.jpg'
import image5 from '../../assets/images/stock_backgrounds/6.jpg'

import Signup from '../components/Forms/Signup'

import { ReactComponent as Cloud} from '../../assets/images/landing_page/cloud-upload.svg'
import { ReactComponent as Runner} from '../../assets/images/landing_page/running.svg'
import { ReactComponent as Share} from '../../assets/images/landing_page/share.svg'


import "../../css/pages/Lander.css";



export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount(){

    document.getElementById("the-nav").style.background = "transparent";      //document.getElementById("the-nav").style.transition = "background-color 500ms ease"
      window.addEventListener('scroll', this.changeNavColor);
      return;

  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.changeNavColor);
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
  

  render() {    

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
              <li><Cloud/><span style = {{fontWeight: "normal"}}>Upload</span> your workout sheets</li>
              <li><Runner/><span style = {{fontWeight: "normal"}}>Track</span> your progress</li>
              <li><Share/><span style = {{fontWeight: "normal"}}>Share</span> and compare results</li>
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
}
