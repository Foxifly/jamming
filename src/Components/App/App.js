import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
// <img src={logo} className="App-logo" alt="logo" />
class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <div className="App-playlist" />
        </div>
      </div>
    );
  }
}

export default App;
