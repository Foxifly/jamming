import React, { Component } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
// import logo from './logo.svg'; // <img src={logo} className="App-logo" alt="logo" />
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "test",
          artist: "test",
          album: "test",
          id: 1
        }
      ],
      playlistName: "Playlist Time",
      playlistTracks: [
        {
          name: "test2",
          artist: "test2",
          album: "test2",
          id: 1
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    } else {
      let currentTracks = this.state.playlistTracks;
      currentTracks.push(track);
      this.setState({ playlistTracks: currentTracks });
    }
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
          <SearchResults
            searchResult={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
          />
        </div>
      </div>
    );
  }
}

export default App;
