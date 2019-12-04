import React from 'react';
import { Button, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import { signup } from '../util/APIUtils';
// import { Link } from 'react-router-dom';
import {
    ALIAS_MIN_LENGTH, ALIAS_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
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
      gender: {value:''}
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
  }
  handleTChange(event){
    this.setState({ team: this.inputT.value });
  }

  handleAliasChange(event, validationFun) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({
      alias: inputValue,
      ...validationFun(inputValue)
    });
  }
  handleEmailChange(event, validationFun) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({
      email: inputValue,
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
  handleCPassChange(event, validationFun) {
    const target = event.target;
    const inputValue = target.value;
    this.setState({
      confirmpassword: inputValue,
      ...validationFun(inputValue)
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
      alias: this.state.alias,
      email: this.state.email,
      password: this.state.password,
      team: this.state.team,
      gender: this.state.gender
    };
    console.log(signupRequest);

    signup(signupRequest)
    .then(response => {
        console.log("Successfully registered. Login to continue!");
        this.props.history.push("/login");
    }).catch(error => {
      console.log(error.message);
    });

  }

  isFormInvalid() {
    // console.log(this.state.alias.validatestatus,this.state.email.validatestatus,this.state.password.validatestatus,this.state.confirmpassword.validatestatus)
    // console.log(this.state.alias.value,this.state.email.value,this.state.password.value,this.state.confirmpassword.value)

    return !(this.state.alias.validatestatus === 'success' &&
        this.state.email.validatestatus === 'success' &&
        this.state.password.validatestatus === 'success'&&
        this.state.confirmpassword.validatestatus === 'success'
    );
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
                  validatestatus={this.state.alias.validatestatus}
                  help={this.state.alias.errorMsg}
                  value={this.state.alias.value}
                  onChange={(event) => this.handleAliasChange(event, this.validateAlias)}
                />
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
                  validatestatus={this.state.email.validatestatus}
                  help={this.state.email.errorMsg}
                  value={this.state.email.value}
                  onChange={(event) => this.handleEmailChange(event,this.validateEmail)}
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
                  validatestatus={this.state.password.validatestatus}
                  help={this.state.password.errorMsg}
                  value={this.state.password.value}
                  onChange={(event) => this.handlePassChange(event, this.validatePassword)}
                />
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
                  validatestatus={this.state.confirmpassword.validatestatus}
                  help={this.state.confirmpassword.errorMsg}
                  value={this.state.confirmpassword.value}
                  onChange={(event) => this.handleCPassChange(event, this.validateConfirmPassword)}
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
      </div>
    )
  }

  // Validation Functions

  validateAlias = (alias) => {
      if(alias.length < ALIAS_MIN_LENGTH) {
          return {
              validatestatus: 'error',
              errorMsg: `Alias is too short (Minimum ${ALIAS_MIN_LENGTH} characters needed.)`
          }
      } else if (alias.length > ALIAS_MAX_LENGTH) {
          return {
              validatestatus: 'error',
              errorMsg: `Alias is too long (Maximum ${ALIAS_MAX_LENGTH} characters allowed.)`
          }
      } else {
          return {
              validatestatus: 'success',
              errorMsg: null,
            };
      }
  }

  validateEmail = (email) => {
      if(!email) {
          return {
              validatestatus: 'error',
              errorMsg: 'Email may not be empty'
          }
      }

      const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
      if(!EMAIL_REGEX.test(email)) {
          return {
              validatestatus: 'error',
              errorMsg: 'Email not valid'
          }
      }

      if(email.length > EMAIL_MAX_LENGTH) {
          return {
              validatestatus: 'error',
              errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
          }
      }

      return {
          validatestatus: 'success',
          errorMsg: null
      }
  }

  validateAliasAvailability() {
      // First check for client side errors in alias
      const aliasValue = this.state.alias;
      const aliasValidation = this.validateAlias(aliasValue);

      if(aliasValidation.validatestatus === 'error') {
          this.setState({
              alias: {
                  value: aliasValue,
                  ...aliasValidation
              }
          });
          return;
      }

      this.setState({
          alias: {
              value: aliasValue,
              validatestatus: 'success',//'validating',
              errorMsg: null
          }
      });

      // checkAliasAvailability(aliasValue)
      // .then(response => {
      //     if(response.available) {
      //         this.setState({
      //             alias: {
      //                 value: aliasValue,
      //                 validatestatus: 'success',
      //                 errorMsg: null
      //             }
      //         });
      //     } else {
      //         this.setState({
      //             alias: {
      //                 value: aliasValue,
      //                 validatestatus: 'error',
      //                 errorMsg: 'This alias is already taken'
      //             }
      //         });
      //     }
      // }).catch(error => {
      //     // Marking validatestatus as success, Form will be recchecked at server
      //     this.setState({
      //         alias: {
      //             value: aliasValue,
      //             validatestatus: 'success',
      //             errorMsg: null
      //         }
      //     });
      // });
  }

  validateEmailAvailability() {
      // First check for client side errors in email
      const emailValue = this.state.email;
      const emailValidation = this.validateEmail(emailValue);

      if(emailValidation.validatestatus === 'error') {
          this.setState({
              email: {
                  value: emailValue,
                  ...emailValidation
              }
          });
          return;
      }

      this.setState({
          email: {
              value: emailValue,
              validatestatus: 'success',//'validating',
              errorMsg: null
          }
      });

      // checkEmailAvailability(emailValue)
      // .then(response => {
      //     if(response.available) {
      //         this.setState({
      //             email: {
      //                 value: emailValue,
      //                 validatestatus: 'success',
      //                 errorMsg: null
      //             }
      //         });
      //     } else {
      //         this.setState({
      //             email: {
      //                 value: emailValue,
      //                 validatestatus: 'error',
      //                 errorMsg: 'This Email is already registered'
      //             }
      //         });
      //     }
      // }).catch(error => {
      //     // Marking validatestatus as success, Form will be recchecked at server
      //     this.setState({
      //         email: {
      //             value: emailValue,
      //             validatestatus: 'success',
      //             errorMsg: null
      //         }
      //     });
      // });
  }

  validatePassword = (password) => {
      if(password.length < PASSWORD_MIN_LENGTH) {
          return {
              validatestatus: 'error',
              errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
          }
      } else if (password.length > PASSWORD_MAX_LENGTH) {
          return {
              validatestatus: 'error',
              errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
          }
      } else {
          return {
              validatestatus: 'success',
              errorMsg: null,
          };
      }
  }

  validateConfirmPassword = (confirmpassword) => {
      if(confirmpassword === this.state.password) {
          return {
              validatestatus: 'success',
              errorMsg: null,
          }
      } else {
          return {
              validatestatus: 'error',
              errorMsg: `Passwords don't match`
          }
      }
  }

}


export default Signup;
