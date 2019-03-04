import React from 'react';
import TopForm from "./TopForm";

class TopTenArtists extends React.Component {
  render () {
      const items = this.props.artists.items.map((artist,index)=> {
        return(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{artist.name}</td>
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
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      )
  }
}


export default TopTenArtists;
