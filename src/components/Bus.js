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
      nextStationLat: 0.0,
      nextStationLon: 0.0,
      timeToStation: '',
      timeOfPrediction: ''
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
        this.setState({
          nextStation: soonestArrival.stationName,
          timeToStation: soonestArrival.timeToStation,
          timeOfPrediction: soonestArrival.timestamp
        })
      })
      .then(
        fetch('https://api.tfl.gov.uk/line/'+ this.state.line +'/route/sequence/outbound')
          .then(response => response.json())
          .then(data => {
            let r = data.stations.filter(stationObject => {
              // console.log(stationObject.name)
              return stationObject.name == this.state.nextStation
            })[0]
            if (r) {
              this.setState({
                nextStationLat: r.lat,
                nextStationLon: r.lon
              })
            }
          })

      )
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      // <p>
      //   {this.state.id} arriving at {this.state.nextStation} in {this.state.timeToStation} sec. [as of {this.state.timeOfPrediction}]<br/>
      //   {this.state.nextStationLat}, {this.state.nextStationLon}
      // </p>
      <Marker
        position={[this.state.nextStationLat, this.state.nextStationLon]}
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
