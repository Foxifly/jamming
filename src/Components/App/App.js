import React, { Component } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
// import logo from './logo.svg'; // <img src={logo} className="App-logo" alt="logo" />
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
      return playlistTrack.uri;
      console.log(playlistTrack.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    });
  }
  search(term) {
    console.log(term);
    Spotify.search(term).then(tracks => {
      console.log(tracks);
      this.setState({ searchResults: tracks });
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
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
