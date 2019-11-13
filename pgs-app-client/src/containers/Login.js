import React from 'react';

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

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.trainerID) {
      return this.setState({ error: 'Trainer ID is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      trainerID: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render(){

    return(
      <form onSubmit={this.handleSubmit}>
        {
          this.state.error &&
          <h3 data-test="error" onClick={this.dismissError}>
            <button onClick={this.dismissError}>✖</button>
            {this.state.error}
          </h3>
        }
        <label>Trainer ID</label>
        <input type="text" data-test="trainerID" value={this.state.trainerID} onChange={this.handleUserChange} />
        <label>Password</label>
        <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

        <input type="submit" value="Log In" data-test="submit" />
      </form>
    )
  }
}

export default Login;
