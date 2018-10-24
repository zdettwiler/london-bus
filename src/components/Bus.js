import React, {Component} from 'react'
import { iconBus } from '../assets/Icons';
import { Marker, Popup } from 'react-leaflet'
import {
  toRadians,
  toDegrees,
  dist,
  bearing,
  destPt
} from '../utils'

class Bus extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      line: this.props.line,
      nextStation: '',
      nextStationPos: [0.0, 0.0],
      prevStationPos: [0.0, 0.0],
      currentPos: [0.0, 0.0], // [lat, lon]
      speed: 9, // m/s, = 32.4 km/h
      timeToStation: '',
      expectedArrival: ''
    }
    // console.log(this.state.id)
  }

  compare(a,b) {
    if (a.timeToStation < b.timeToStation)
      return -1;
    if (a.timeToStation > b.timeToStation)
      return 1;
    return 0;
  }

  getCurrentPos() {
    // get distance from station
    let distanceToStation = this.state.speed * this.state.timeToStation
    // find segment of route of bus
    // find bearing between segment extremities
    let bearingToStation = bearing(this.state.prevStationPos, this.state.nextStationPos)
    // find position with distance on segment
    let position = destPt(this.state.nextStationPos, distanceToStation, bearingToStation)
    console.log(this.state.prevStationPos, this.state.nextStationPos)
    console.log(distanceToStation, bearingToStation, position)
    this.setState({
      currentPos: position
    })
  }

  update() {
    fetch('https://api.tfl.gov.uk/Vehicle/'+ this.state.id +'/Arrivals')
      .then(response => response.json())
      .then(data => {
        let soonestArrival = data.sort(this.compare)[0]
        if (soonestArrival) {
          this.setState({
            nextStation: soonestArrival.stationName,
            timeToStation: Math.round((new Date(soonestArrival.expectedArrival) - new Date())/1000),
            expectedArrival: new Date(soonestArrival.expectedArrival)
          })
        }
      })
      .then(fetch('https://api.tfl.gov.uk/line/'+ this.state.line +'/route/sequence/outbound')
        .then(response => response.json())
        .then(data => {
          let r = data.stations.filter(stationObject => {
            // console.log(stationObject.name)
            return stationObject.name === this.state.nextStation
          })[0]
          if (r) {
            this.setState({
              prevStationPos: this.state.nextStationPos,
              nextStationPos: [r.lat, r.lon],
              nextStation: r.name,
              // currentPos: [r.lat, r.lon]
            })
          }
        })
      )
      .then(() => {
        this.getCurrentPos()
      })

    // console.log(
    //   this.state.id + ': arriving at ' + this.state.nextStation + '(' + this.state.currentPos + ')'
    //   + ' in ' + this.state.timeToStation + 's\n'
    // );
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      // <p>
      //   {this.state.id} arriving at {this.state.nextStation} in {this.state.timeToStation} sec. [as of {this.state.expectedArrival}]<br/>
      //   {this.state.nextStationLat}, {this.state.nextStationLon}
      // </p>
      <Marker
        position={this.state.currentPos}
        icon={iconBus}
      >
        <Popup>
          {this.state.id}
        </Popup>
      </Marker>
    )
  }
}

export default Bus
