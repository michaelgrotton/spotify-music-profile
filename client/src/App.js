import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import TopTenTracks from "./TopTenTracks";
import TopTenArtists from "./TopTenArtists";
import 'bootstrap/dist/css/bootstrap.css';
import Steam from "./Steam";
import NowPlaying from "./NowPlaying"

const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Nothing Playing', albumArt: '' },
      topTracks : {"items":[]},
      topArtists: {"items":[]}
    }
  }

  getTopTenTracks = (term) => {
    spotifyApi.getMyTopTracks({limit: 10, time_range:term})
      .then((response) => {
        this.setState({
          topTracks: response
        });
      })
  }

  getTopTenArtists = (term) => {
    spotifyApi.getMyTopArtists({limit: 10, time_range:term})
      .then((response) => {
        this.setState({
          topArtists: response
        });
      })
  }

  componentDidMount () {
    this.getTopTenTracks("short_term");
    this.getTopTenArtists("short_term");
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
        if (!this.state.loggedIn) {
          return(
            <div className="App container">
            <a href='http://localhost:8888' className="btn btn-success" style={{marginTop:50}} > Login to Spotify </a>
            </div>
          )
        } else {
          return (
            <div className="App container">
              <NowPlaying spotifyApi={spotifyApi}/>
                <div className="container">
                  <div className="row">
                      <div className="col">
                        <h3>Your Top Tracks</h3>
                        <TopTenTracks tracks={this.state.topTracks} apiCall={this.getTopTenTracks}/>
                      </div>
                      <div className="col">
                        <h3>Your Top Artists</h3>
                        <TopTenArtists artists={this.state.topArtists} apiCall={this.getTopTenArtists}/>
                      </div>
                  </div>
                </div>
                <h3>Your Top Artists Over Time</h3>
                <Steam spotifyApi={spotifyApi}/>
            </div>
        )
        }
  }
}

export default App;
