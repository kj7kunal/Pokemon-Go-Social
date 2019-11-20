import React from 'react';
import { Button, Row, Col, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";

{/* TODO:
  1. change team and gender fields to dropdown list
  2. add signup validation functionality
  3. check validity of various form fields
  3. maybe add a unique checker from database */}


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      trainerID: '',
      password: '',
      error: '',
    };

    this.teamList = [
    { id: 1, name: "Instinct" },
    { id: 2, name: "Valor" },
    { id: 3, name: "Mystic" }
    ];

    this.genderList = [
    { id: 1, name: "male" },
    { id: 2, name: "female" }
    ];

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
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup controlId="email" bsSize="small">
                  <ControlLabel>Trainer ID</ControlLabel>
                  <FormControl
                    autoFocus
                    type="trainerID"
                    data-test="trainerID"
                    value={this.state.trainerID}
                    onChange={this.handleUserChange}
                    />
                  </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId="email" bsSize="small">
                  <ControlLabel>Email ID</ControlLabel>
                  <FormControl
                    autoFocus
                    type="emailID"
                    data-test="emailID"
                    value={this.state.emailID}
                    onChange={this.handleFieldChange}
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup controlId="password" bsSize="small">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    autoFocus
                    type="password"
                    data-test="password"
                    value={this.state.password}
                    onChange={this.handlePassChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId="confirmpassword" bsSize="small">
                  <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl
                    autoFocus
                    type="password"
                    data-test="password"
                    value={this.state.confirmpassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup controlId="date" bsSize="small">
                  <ControlLabel>Date Of Birth</ControlLabel>
                  <FormControl
                    autoFocus
                    type="date"
                    data-test="DOB"
                    value={this.state.DOB}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup controlId="formControlsSelect" bsSize="small">
                  <ControlLabel>Team</ControlLabel>
                  <FormControl
                    autoFocus
                    type="select"
                    data-test="team"
                    value={this.state.confirmpassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup controlId="formControlsSelect" bsSize="small">
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl
                    autoFocus
                    type="select"
                    data-test="gender"
                    value={this.state.confirmpassword}
                    onChange={this.handleFieldChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button block type="submit">
              Register
            </Button>
            {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                <button onClick={this.dismissError}>✖</button>
                {this.state.error}
              </h3>
            }
          </Form>
        </form>
      </div>
    )
  }
}

export default Signup;
