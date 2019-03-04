import React from 'react';
import TopForm from "./TopForm";

class TopTenTracks extends React.Component {
  render () {
      const items = this.props.tracks.items.map((track,index)=> {
        return(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{track.name}</td>
            <td>{track.artists[0].name}</td>
          </tr>
        )
      });

      return(
        <div className="container">
          <TopForm apiCall={this.props.apiCall}/>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Track Name</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      )
  }
}


export default TopTenTracks;
