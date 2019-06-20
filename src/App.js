import React, { Fragment } from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import LoginModal from './components/LoginModal'
import Navbar from './components/Navbar'
import Dropdown from './components/Dropdown'
import Sidebar from "react-sidebar";

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
        backgroundColor: "white",
        color: "#4B4B4B",
        fontWeight: "bold",
        fontSize: "10pt",
        height: "100%"
      }
    }

    let sidebarContent = (
      <div className = "sidebar-content">
        
      <ul>
      <li><h3>Menu</h3></li>
      <li>Dashboard</li>
      <li>Logs</li>
      <li>Schedules</li>
      <li>Bookmarks</li>
      <li>Connect</li>
      <li>Settings</li>
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
        <div style = {{position: "absolute", left: "250px"}}><Routes childProps={childProps} /></div>
      </div>
    );
  }  
  
}

export default withRouter(App);
