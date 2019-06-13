import React, { Fragment } from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import logo from './assets/images/logo.png'
import LoginModal from './components/LoginModal'


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
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <LoginModal {...childProps} onHide = {this.handleModalClose}/>
        </Modal>
        <Navbar id = "the-nav" fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className = "homelink" to="/" style = {{color: "white"}}>CloudFit<img src = {logo}/></Link>
            </Navbar.Brand>
            <Navbar.Toggle style = {{top: "10px"}}/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}><span style = {{color:"white"}}>Logout</span></NavItem>
                : <Fragment>
                      <NavItem onClick = {this.handleModalShow}><span style = {{color:"white"}}>Login</span></NavItem>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />        
      </div>
    );
  }  
  
}

export default withRouter(App);
