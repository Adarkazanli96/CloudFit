import React, { Fragment } from "react";
import './App.css';
import Routes from './Routes'
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import Icon from './assets/images/logo.png'


class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
    
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
      if (e !== 'No current user') {
        alert(e);
      }
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
        <Navbar className = "nbar" fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className = "homelink" style = {{color: "white"}} to="/"><span style = {{display: "inline", float: "left"}}>CloudFit</span><img src = {Icon}/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div  className = "everything-else" >
        <Routes childProps={childProps} />
        </div>
        
      </div>
    );
  }  
  
}

export default withRouter(App);
