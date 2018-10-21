import React, {Component} from 'react'
import { iconBus } from '../assets/Icons';
import { Marker, Popup } from 'react-leaflet'

class Bus extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      line: this.props.line,
      nextStation: '',
      currentLat: 0.0,
      currentLon: 0.0,
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
              currentLat: r.lat,
              currentLon: r.lon
            })
          }
        })
      )

    console.log(
      this.state.id + ': arriving at ' + this.state.nextStation
      + ' in ' + this.state.timeToStation + 's\n'
    );
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
        position={[this.state.currentLat, this.state.currentLon]}
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
