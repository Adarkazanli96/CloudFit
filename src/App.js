import React, { Fragment } from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import logo from './assets/images/logo.png'
import LoginModal from './components/LoginModal'
import Toolbar from './components/Navbar'
import Dropdown from './components/Dropdown'


class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      showModal: false
    };
    
  }

  handleModalClose = () =>{
    this.setState({showModal: false})
  }

  handleModalShow = () =>{
    this.setState({showModal: true})
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    //this.props.history.push("/login");

  }
  

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      //if (e !== 'No current user') {
        //alert(e);
      //}
    }
  
    this.setState({ isAuthenticating: false });

    window.addEventListener('scroll', function() {
      if (window.scrollY > 30) {
        document.getElementById('the-nav').style.backgroundColor = 'black'
      }
      else{
        document.getElementById('the-nav').style.backgroundColor = "transparent";
      }
    });
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <LoginModal {...childProps} onHide = {this.handleModalClose}/>
        </Modal>

        <Toolbar>
        {this.state.isAuthenticated? <Dropdown logout = {this.handleLogout} /> : <button className = "login-btn" onClick = {this.handleModalShow}>Login</button>}
        </Toolbar>
        <Routes childProps={childProps} />
      </div>
    );
  }  
  
}

export default withRouter(App);
