const clientID = "e153d153cd2f4747904a340281fe87ac";
const redirectURI = "http://localhost:3000/";
let accessToken = "";
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      let url = window.location.href;
      accessToken = url.match(/access_token=([^&]*)/)[1];
      let expireTime = url.match(/expires_in=([^&]*)/)[1] * 1000;
      setTimeout(() => {
        accessToken = "";
      }, expireTime);
      window.history.pushState("Access Token", null, "/");
    }
  }
};

export default Spotify;
