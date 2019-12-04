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
      alias: {value:''},
      email: {value:''},
      password: {value:''},
    };

    this.handleAliasChange = this.handleAliasChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleAliasChange(event, validationFun) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({
      alias: inputValue,
      ...validationFun(inputValue)
    });
  }
  handlePassChange(event, validationFun) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({
      password: inputValue,
      ...validationFun(inputValue)
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const loginRequest = {
      alias: this.state.alias,
      password: this.state.password
    };
    console.log(loginRequest);

    login(loginRequest)
    .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        // this.props.onLogin();
        console.log("successfully logged in.")
        this.props.history.push("/");
    }).catch(error => {
        this.setState({ password: {value: '' }});
        if(error.status === 401) {
            console.log('Your Username or Password is incorrect. Please try again!');
        } else {
            console.log(error.message);
        }
        this.setState({ isLoading: false });
    });
  }


  render(){

    return(
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="alias" bsSize="large">
            <ControlLabel>Trainer Alias</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              name="alias"
              placeholder="Your registered trainer name"
              validatestatus={this.state.alias.validatestatus}
              help={this.state.alias.errorMsg}
              value={this.state.alias.value}
              required={true}
              onChange={(event) => this.handleAliasChange(event, this.validateAlias)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Your password (8<chars<20)"
              validatestatus={this.state.password.validatestatus}
              help={this.state.password.errorMsg}
              value={this.state.password.value}
              required={true}
              onChange={(event) => this.handlePassChange(event, this.validatePassword)}
            />
          </FormGroup>
          <Button block type="submit">
            Login
          </Button>
        </form>
      </div>
    )
  }

  validateAlias = (alias) => {
      if(!alias) {
          return {
              validatestatus: 'error',
              errorMsg: `Alias is not enterred.)`
          }
      } else if (alias.length < 0) {
          return {
              validatestatus: 'error',
              errorMsg: `Alias is not enterred.)`
          }
      } else {
          return {
              validatestatus: 'success',
              errorMsg: null,
            };
      }
  }

  validatePassword = (password) => {
      if(!password) {
          return {
              validatestatus: 'error',
              errorMsg: `Password is not enterred.)`
          }
      } else if (password.length < 0) {
          return {
              validatestatus: 'error',
              errorMsg: `Password is not enterred.)`
          }
      } else {
          return {
              validatestatus: 'success',
              errorMsg: null,
            };
      }
  }
}


export default Login;
