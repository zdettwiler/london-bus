import React, { Component } from 'react'
import Line from './components/Line'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class App extends Component {
  constructor() {
    super()
    this.state = {
      line: 1,

      // for Leaflet
      position: [51.505, -0.09],
      zoom: 12
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='app'>
        <Map className='map' center={this.state.position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

          <Line line={this.state.line} />

        </Map>
      </div>
    );
  }
}

export default App
