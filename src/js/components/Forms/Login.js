import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from "../Reusables/LoaderButton";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        password: ""
      };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.close();
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
  

  render() {
    return (
      <div className="Login">
        
        <form onSubmit={this.handleSubmit}>
        <h2>Log in to CloudFit</h2>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>EMAIL</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder = "Enter email"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>PASSWORD</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder = "Enter password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="LOG IN"
            loadingText="Logging in…"
            backgroundColor = "#292c32"
            color = "white"
          />


        </form>
      </div>
    );
  }
}
