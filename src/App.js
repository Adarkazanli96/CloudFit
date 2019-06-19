import React, { Fragment } from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import LoginModal from './components/LoginModal'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
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

    
  }
  
  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
          <LoginModal {...childProps} show = {this.state.showModal} onHide = {this.handleModalClose}/>

        <Navbar {...childProps}>
        {this.state.isAuthenticated? <Dropdown logout = {this.handleLogout} /> : <button className = "login-btn" onClick = {this.handleModalShow}>LOG IN</button>}
        </Navbar>
        <Sidebar/>
        <Routes childProps={childProps} />
      </div>
    );
  }  
  
}

export default withRouter(App);
