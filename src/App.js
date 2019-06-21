import React, { Fragment } from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import LoginModal from './components/LoginModal'
import Navbar from './components/Navbar'
import Dropdown from './components/Dropdown'
import Sidebar from "react-sidebar";

import bookmarks from './assets/images/menu/bookmarks.png'
import dashboard from './assets/images/menu/dashboard.png'
import logs from './assets/images/menu/logs.png'
import progress from './assets/images/menu/progress.png'
import share from './assets/images/menu/share.png'
import settings from './assets/images/menu/settings.png'

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
      <li><img src = {logs}/>Logs</li>
      <li><img src = {progress}/>Progress</li>
      <li><img src = {bookmarks}/>Bookmarks</li>
      <li><img src = {share}/>Share</li>
      <li><img src = {settings}/>Settings</li>
    </ul>
      </div>
    )
  
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
          <LoginModal {...childProps} show = {this.state.showModal} onHide = {this.handleModalClose}/>

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
        <div style = {this.state.isAuthenticated? {position: "absolute", left: "250px"} : {}}><Routes childProps={childProps} /></div>
      </div>
    );
  }  
  
}

export default withRouter(App);
