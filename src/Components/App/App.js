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
          name: "Track 1",
          artist: "Track 1 Artist",
          album: "Track 1 Album",
          id: 1
        },
        {
          name: "Track 2",
          artist: "Track 2 Artist",
          album: "Track 2 Album",
          id: 2
        },
        {
          name: "Track 3",
          artist: "Track 3 Artist",
          album: "Track 3 Album",
          id: 3
        }
      ],
      playlistName: "Playlist Time",
      playlistTracks: [
        {
          name: "Playlist Track",
          artist: "Playlist Track Artist",
          album: "Playlist Track Album",
          id: 4
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.serach = this.search.bind(this);
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
  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        savedTrack => savedTrack.id !== track.id
      )
    });
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => {
      playlistTrack.uri;
    });
  }
  search(term) {
    console.log(term);
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div class="App">
          <SearchBar onSearch={this.search} />
          <div class="App-playlist">
            <SearchResults
              searchResult={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              onSave={this.savePlaylist}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
