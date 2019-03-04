import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

let names = [];

const colorArray = ['#ff7256', '#6da4bf', '#507a98', '#833200', '#1a0079',
'#801375', '#0e5e50', '#3d1d75', '#104e8b', '#e59400',
'#ff3334', '#009999', '#E6B3B3', '#6680B3', '#66991A',
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


let rows = [];

class Steam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name:"forever ago"},{name:"6 months ago"},{name:"4 weeks ago"}]
    }
  }

  data = () => {
      this.props.spotifyApi.getMyTopArtists({limit: 10, time_range:"long_term"})
        .then((response) => {
          let data_arr = this.state.data;
          response.items.forEach((artist,index)=> {
            data_arr[0][artist.name] = 10 - index;
            names.push(artist.name)
          });
          this.setState({
            data: data_arr
          })
        })

        this.props.spotifyApi.getMyTopArtists({limit: 10, time_range:"medium_term"})
            .then((response) => {
              let data_arr = this.state.data;
              response.items.forEach((artist,index)=> {
                data_arr[1][artist.name] = 10 - index;
                names.push(artist.name)
              });
              this.setState({
                data: data_arr
              })
            })

        this.props.spotifyApi.getMyTopArtists({limit: 10, time_range:"short_term"})
          .then((response) => {
            let data_arr = this.state.data;
            response.items.forEach((artist,index)=> {
              data_arr[2][artist.name] = 10 - index;
              names.push(artist.name)
            });
            this.setState({
              data: data_arr
            })
          })


  }

  componentDidMount() {
    this.data()
  }

  componentWillUpdate() {
    names = [...new Set(names)];
    rows=[]
    for(let i=0;i<names.length;i++) {
      rows.push(<Area type="monotone" dataKey={names[i]} stackId="1" stroke={colorArray[i]} fill={colorArray[i]} />)
    }
  }

  render () {

      return (
      <div className="container" style={{height:400,width:'100%'}}>
        <ResponsiveContainer>
          <AreaChart
            data={JSON.parse(JSON.stringify(this.state.data))}
            margin={{
              top: 10, right: 50, left: 50, bottom: 10,
            }}
          >
            <XAxis dataKey="name" />
            <Tooltip/>
            {rows}
            <h1>hello</h1>
          </AreaChart>
        </ResponsiveContainer>
        <p>Super confusingly, your top artist for a time period is the one with the higher number in the tooltip (which corresponds to the larger area). I haven't dug into the charting library to change that yet, or move the tooltip off of the area of the actual chart so you can see both.</p>
      </div>
    );
  }
}

export default Steam;
