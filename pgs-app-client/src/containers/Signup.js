import React from 'react';
import { Button, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import { signup } from '../util/APIUtils';
import {
    ALIAS_MIN_LENGTH, ALIAS_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      alias: {value:''},
      email: {value:''},
      password: {value:''},
      confirmpassword: {value:''},
      team: {value:''},
      gender: {value:''},
      error: {value:''},
      errorAlias: {value:''},
      errorPass: {value:''}
    };

    this.handleAliasChange = this.handleAliasChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleCPassChange = this.handleCPassChange.bind(this);
    this.handleGChange = this.handleGChange.bind(this);
    this.handleTChange = this.handleTChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleGChange(event){
    this.setState({ gender: this.inputG.value });
    this.setState({ error: {value: ''}});
  }

  handleTChange(event){
    this.setState({ team: this.inputT.value });
    this.setState({ error: {value: ''}});
  }

  handleAliasChange(event) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({alias: inputValue});
    this.setState({errorAlias: {value: this.validateAlias()}})
    this.setState({ error: {value: ''}});
  }

  handleEmailChange(event) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({email: inputValue});
    this.setState({ error: {value: ''}});
  }

  handlePassChange(event) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({password: inputValue});
    this.setState({errorPass: {value: this.validatePassword()}})
    this.setState({ error: {value: ''}});
  }

  handleCPassChange(event) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({confirmpassword: inputValue});
    this.setState({ error: {value: ''}});
  }


  handleSubmit(event) {
    event.preventDefault();
    const password = this.state.password;
    const confirmpassword = this.state.confirmpassword;

    if(password!==confirmpassword){
      this.setState({ error: {value: "Passwords Don't Match"}});
      this.setState({ confirmpassword: {value: '' }});
    } else {
      const signupRequest = {
        alias: this.state.alias,
        email: this.state.email,
        password: this.state.password,
        team: this.state.team,
        gender: this.state.gender
      };

      signup(signupRequest)
      .then(response => {
          console.log("Successfully registered. Login to continue!");
          this.props.history.push("/login");
      }).catch(error => {
        this.setState({ error: {value: error.message}});
      });
    }

  }


  render(){

    return(
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup controlId="alias" bsSize="small">
                <ControlLabel>Trainer Alias</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  autoComplete="off"
                  name="alias"
                  placeholder="Your Unique trainer name"
                  value={this.state.alias.value}
                  onChange={(event) => this.handleAliasChange(event)}
                />
                <span>{this.state.errorAlias.value}</span>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup controlId="email" bsSize="small">
                <ControlLabel>Email ID</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Your Email ID"
                  value={this.state.email.value}
                  onChange={(event) => this.handleEmailChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup controlId="password" bsSize="small">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="A password between 8 to 20 characters"
                  value={this.state.password.value}
                  onChange={(event) => this.handlePassChange(event)}
                />
                <span>{this.state.errorPass.value}</span>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup controlId="confirmpassword" bsSize="small">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  name="confirmpassword"
                  autoComplete="off"
                  placeholder="Re-enter password"
                  value={this.state.confirmpassword.value}
                  onChange={(event) => this.handleCPassChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup controlId="team" bsSize="small">
                <ControlLabel>Team</ControlLabel>
                <FormControl
                  autoFocus
                  componentClass="select"
                  name="team"
                  placeholder="Your Team"
                  value={this.state.team.value}
                  inputRef={ tm => this.inputT=tm }
                  onChange={this.handleTChange.bind(this)}>
                  <option value="">select</option>
                  <option value="INSTINCT">Instinct (Yellow)</option>
                  <option value="VALOR">Valor (Red)</option>
                  <option value="MYSTIC">Mystic (Blue)</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup controlId="gender" bsSize="small">
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  autoFocus
                  componentClass="select"
                  name="gender"
                  placeholder="Your Gender"
                  value={this.state.gender.value}
                  inputRef={ gen => this.inputG=gen }
                  onChange={this.handleGChange.bind(this)}>
                  <option value="">select</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          <Button block type="submit">
            Register
          </Button>
        </form>
        <h5>{this.state.error.value}</h5>
      </div>
    )
  }

  // Validation Functions


  validateAlias() {
      // First check for client side errors in alias
      const alias = this.state.alias;
      if(alias===''){
        return '';
      }
      if(alias.length < ALIAS_MIN_LENGTH-1) {
          return `Alias too short (Min ${ALIAS_MIN_LENGTH} characters)`;
      } else if (alias.length > ALIAS_MAX_LENGTH-1) {
          return `Alias too long (Max ${ALIAS_MAX_LENGTH} characters)`;
      }
      return '';
  }


  validatePassword() {
      // First check for client side errors in alias
      const password = this.state.password;
      if(password===''){
        return '';
      }
      if(password.length < PASSWORD_MIN_LENGTH-1) {
          return `Password too short (Min ${PASSWORD_MIN_LENGTH} characters)`;
      } else if (password.length > PASSWORD_MAX_LENGTH-1) {
          return `Password too long (Max ${PASSWORD_MAX_LENGTH} characters)`;
      }
      return '';
  }


}


export default Signup;
