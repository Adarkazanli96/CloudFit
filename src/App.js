import React from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import Navbar from './js/components/Navigation/Navbar'
import Dropdown from './js/components/Navigation/Dropdown'
import Sidebar from "react-sidebar";

import {Modal} from 'react-bootstrap'

import bookmarks from './assets/images/sidebar_icons/bookmarks.png'
import dashboard from './assets/images/sidebar_icons/dashboard.png'
import logs from './assets/images/sidebar_icons/logs.png'
import progress from './assets/images/sidebar_icons/progress.png'
import share from './assets/images/sidebar_icons/share.png'
import settings from './assets/images/sidebar_icons/settings.png'
import streams from './assets/images/sidebar_icons/streams.png'

import Login from './js/components/Forms/Login'



class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      showModal: false,
      sidebarOpen: true
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

    
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
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

    
  }
  
  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    let styles = {
      root:{
        
      },
      sidebar: {
        zIndex: 2,
        position: "fixed",
        top: "65px",
        bottom: 0,
        transition: "transform .3s ease-out",
        WebkitTransition: "-webkit-transform .3s ease-out",
        willChange: "transform",
        width: "250px",
        backgroundColor: "#FAFAFA",
        color: "#4B4B4B",
        fontWeight: "bold",
        fontSize: "10pt",
        height: "100%"
      }
    }

    let sidebarContent = (
      <div className = "sidebar-content">
        
      <ul>
      <li><h4 style = {{fontWeight: "bold"}}>Menu</h4></li>
      <li><img src = {dashboard}/>Dashboard</li>
      <li><img src = {streams}/><Link style = {{color: "#4B4B4B", textDecoration: "none"}} to="/streams">Live Streams</Link></li>
      <li><img src = {logs}/><Link style = {{color: "#4B4B4B", textDecoration: "none"}} to="/logs">Logs</Link></li>
      <li><img src = {progress}/>Progress</li>
      <li><img src = {bookmarks}/><Link style = {{color: "#4B4B4B", textDecoration: "none"}} to="/bookmarks">Bookmarks</Link></li>
      <li><img src = {share}/>Share</li>
      <li><img src = {settings}/>Settings</li>
    </ul>
      </div>
    )
  
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
          <Modal show = {this.state.showModal} onHide = {this.handleModalClose}>
            <Modal.Header closeButton onClick = {this.handleModalClose}>
            </Modal.Header>
            <Modal.Body>
              <Login {...childProps} close = {this.handleModalClose}/>
            </Modal.Body>
          </Modal>

        <Navbar {...childProps}>
        {this.state.isAuthenticated? <Dropdown logout = {this.handleLogout} /> : <button className = "login-btn" onClick = {this.handleModalShow}>LOG IN</button>}
        </Navbar>
        {this.state.isAuthenticated? <Sidebar
        sidebar={sidebarContent}
        open={true}
        docked = {true}
        styles={styles}
        transitions = {false}
      >
      </Sidebar> : null}
        <div style = {this.state.isAuthenticated? {position: "absolute", left: "250px", width: "calc(100% - 250px)", top: "65px"} : {}}><Routes childProps={childProps} /></div>
      </div>
    );
  }  
  
}

export default withRouter(App);
