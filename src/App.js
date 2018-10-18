import React, { Component } from 'react'
import Line from './components/Line'
import Bus from './components/Bus'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: [],
      line: 35,

      // for Leaflet
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    }
  }

  componentDidMount() {
    fetch('https://api.tfl.gov.uk/line/'+ this.state.line + '/arrivals')
      .then(response => response.json())
      .then(data => {
        this.setState({
          serverData: [...new Set(
              data.map(item => item.vehicleId)
            )].sort(),
          // lastUpdate: new Date()
          })
        })
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="App">
        {/* <Line line={this.state.line} />

        {this.state.serverData[0] &&
          this.state.serverData.map(busId =>
            <Bus id={busId} line={this.state.line} key={busId}/>
          )
        } */}

        <Map className='map' center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      </div>
    );
  }
}

export default App
