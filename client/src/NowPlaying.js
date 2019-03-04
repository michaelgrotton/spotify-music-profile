import React from 'react';

class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: { name: 'Nothing Playing', albumArt: '' }
    }
  }

  getNowPlaying() {
    this.props.spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        if(response !== '') {
          this.setState({
            nowPlaying: {
                name: response.item.name,
                albumArt: response.item.album.images[0].url
              }
          });
        }
      })
    }

  componentDidMount() {
    this.getNowPlaying();
    this.checkPlayingID = setInterval(
      () => this.getNowPlaying(),
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.checkPlayingID);
  }


  render () {
      return(
      <div>
        <h3>Now Playing</h3>
        <div className="card mx-auto" style={{width:250}}>
          {this.state.nowPlaying.name != "Nothing Playing" &&
            <img className="card-img-top" src={this.state.nowPlaying.albumArt} alt="Card image cap"></img>
          }
          <div className="card-body">
            <h5 className="card-title">{ this.state.nowPlaying.name }</h5>
        </div>
      </div>
    </div>
    )
  }
}

export default NowPlaying;
