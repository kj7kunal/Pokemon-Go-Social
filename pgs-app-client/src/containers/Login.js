import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      trainerID: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }


  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.trainerID) {
      return this.setState({ error: 'Trainer ID is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(event) {
    this.setState({
      trainerID: event.target.value,
    });
  };

  handlePassChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render(){

    return(
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Trainer ID</ControlLabel>
            <FormControl
              autoFocus
              type="trainerID"
              data-test="trainerID"
              value={this.state.trainerID}
              onChange={this.handleUserChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              data-test="password"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
          </FormGroup>
          <Button block type="submit">
            Login
          </Button>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
        </form>
      </div>
    )
  }
}

export default Login;
