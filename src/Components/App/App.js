import React, { Component } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
// import logo from './logo.svg';
import "./App.css";
// <img src={logo} className="App-logo" alt="logo" />
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: this.props.track.name,
          artist: this.props.track.artist,
          album: this.props.track.album,
          id: 1
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <h1>
          Ja <span className="highlight"> mmm </span>ing{" "}
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist" />
          <SearchResults searchResult={this.state.searchResults} />
          <Playlist />
        </div>
      </div>
    );
  }
}

export default App;
