import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as configurator from 'configurator/configurator';


import logo from './assets/images/intel_logo.svg';
import './App.scss';
import Home from './views/Home.js';
import Room from './views/Room.js';

class App extends Component {
  constructor(props) {
    const { io } = props;
    super(props);
    this.state = {
      io,
    };
  }
  title = configurator.config.title;
  
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" />
            <Link to="/">{this.title}</Link>
            <Link to="/room/orange">Room</Link>
          </header>
          <section className="container">
            <Route exact path="/" component={Home}/>
            <Route path="/room/:roomId" render={props => (<Room io={this.state.io} {...props}/>)}/>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
