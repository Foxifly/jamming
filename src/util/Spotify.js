const clientID = "e153d153cd2f4747904a340281fe87ac";
const redirectURI = "http://localhost:3000/";
let userAccessToken = "";
const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    } else {
      let url = window.location.href;
      let accessToken = url.match(/access_token=([^&]*)/);
      let expireTime = url.match(/expires_in=([^&]*)/);
      if (accessToken && expireTime) {
        userAccessToken = accessToken[1];
        setTimeout(() => {
          userAccessToken = "";
        }, expireTime[1] * 1000);
        window.history.pushState("Access Token", null, "/");
        return userAccessToken;
      } else {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },
  search(term) {
    const spotifyEndpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(spotifyEndpoint, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map(currentTrack => {
            return {
              id: currentTrack.id,
              name: currentTrack.name,
              artist: currentTrack.artists[0].name,
              album: currentTrack.album.name,
              uri: currentTrack.uri
            };
          });
        }
      });
  },
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    } else {
      let accessToken = this.getAccessToken();
      let userID;
      let meURL = "https://api.spotify.com/v1/me";
      let userURL = "https://api.spotify.com/v1/users/";
      let playlistID;
      fetch(meURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(jsonResponse => (userID = jsonResponse.id))
        .then(
          fetch(`${userURL}/${userID}/playlists`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            method: "POST",
            body: JSON.stringify({ name: playlistName })
          })
        )
        .then(response => response.json())
        .then(jsonResponse => (playlistID = jsonResponse.id))

        .then(
          fetch(`${userURL}/${userID}/playlists/${playlistID}/tracks`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            method: "POST",
            body: JSON.stringify({ uri: trackURIs })
          })
        );
    }
  }
};

export default Spotify;
