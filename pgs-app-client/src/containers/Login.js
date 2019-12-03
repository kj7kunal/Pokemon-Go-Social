import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { login } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      alias: '',
      password: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }


  dismissError() {
    this.setState({ error: '' });
  }

  handleChange(event) {
    this.setState({
      Alias: event.target.value,
    });
  };

  handleSubmit(event) {

    this.setState({ isLoading: true });

    if (!this.state.alias) {
      return this.setState({ error: 'Alias is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }


    return this.setState({ error: '' });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.form.validateFields((err, values) => {
        if (!err) {
            const loginRequest = Object.assign({}, values);
            login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
            }).catch(error => {
                if(error.status === 401) {
                    console.log('Your Username or Password is incorrect. Please try again!');
                } else {
                    console.log('Sorry! Something went wrong. Please try again!');
                }
                this.setState({ isLoading: false });
            });
        }
    });
}


  render(){

    return(
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="alias" bsSize="large">
            <ControlLabel>Alias</ControlLabel>
            <FormControl
              autoFocus
              type="alias"
              value={this.state.alias}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
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
