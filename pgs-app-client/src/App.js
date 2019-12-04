import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import './App.css';

import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';

import LoadingIndicator from './common/LoadingIndicator';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    })
    .catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  // Handle Logout, Set currentUser and isAuthenticated state which will be passed to other components
  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push("/login");
    console.log("Successfully logged out");
  }

  /*
   This method is called by the Login component after successful login
   so that we can load the logged-in user details and set the currentUser &
   isAuthenticated state, which other components will use to render their JSX
  */
  handleLogin() {
    console.log("Successfully logged in");
    this.loadCurrentUser();
    this.props.history.push("/");
  }


  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      currentUser: this.state.currentUser,
      onLogin: this.handleLogin
    };

    return (
      !this.state.isLoading &&
      <div className="App Container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img alt="" src="./android-chrome-192x192.png" width="30" height="30"/>Pokemon GO Social</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {!this.state.isAuthenticated
                ? <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
                : <Fragment>
                    <LinkContainer to="/pokenews">
                      <NavItem>PokeNews</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/trainer">
                      <NavItem>Trainer</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/search">
                      <NavItem>Search</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
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
