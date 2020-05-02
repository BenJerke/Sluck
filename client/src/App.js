import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const socket = require('socket.io-client')('http://localhost:3002');
socket.on("kark", msg => console.log("The backend says " + msg + "."));

class App extends Component {
  componentDidMount() {
    socket.emit("kark", "hi");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  };
};

export default App;
