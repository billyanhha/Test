import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Home from './containers/Home';
import axios from './axios';
class App extends Component {
  state = {

  }
  _onLoggedIn = (e) => {
    this.setState({ username: e });
  }
  componentDidMount() {
    axios.get('/api/auth')
      .then(username => this.setState({ username: username.data }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={(props) => <Home {...props} username={this.state.username ? this.state.username : ''} />} />
          <Route path="/login" render={(props) => <Login {...props} onLoggedIn={this._onLoggedIn} />} />
          <Route path="/signUp" render={(props) => <SignUp {...props} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
