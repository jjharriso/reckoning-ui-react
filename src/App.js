import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as configurator from 'configurator/configurator';


import logo from './assets/images/intel_logo.svg';
import './App.scss';
import Home from './views/Home.js';
import Room from './views/Room.js';

class App extends Component {
  constructor(props) {
    super(props);
    const { io, user } = props;
    this.state = {
      io,
      user,
    };
  }
  title = configurator.config.title;

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" />
            <nav>
              <Link to="/">{this.title}</Link>
              <Link to="/room/300">Room 300</Link>
            </nav>
          </header>
          <section className="container">
            <Route exact path="/" component={Home} />
            <Route path="/room/:roomId" render={props => (<Room io={this.state.io} user={this.state.user} {...props} />)} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
