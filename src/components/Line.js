import React, {Component} from 'react'
import Bus from './Bus'
import { Polyline } from 'react-leaflet'

class Line extends Component {

  constructor(props) {
    super(props)
    this.state = {
      line: this.props.line,
      direction: '',
      origin: '',
      destination: '',
      lineRoute: [],
      busesIds: [],
    }
  }

  componentDidMount() {
    // Get line info
    fetch('https://api.tfl.gov.uk/line/'+ this.state.line +'/route')
      .then(response => response.json())
      .then(data => {
        this.setState({
          direction: data.routeSections[0].direction,
          origin: data.routeSections[0].originationName,
          destination: data.routeSections[0].destinationName
        })
      })

    fetch('https://api.tfl.gov.uk/line/'+ this.state.line +'/route/sequence/outbound')
      .then(response => response.json())
      .then(data => {
        let lineRoute = data.lineStrings[0]
          .match(/\[(-?\d+.\d+,\d+.\d+)\]/g)
          .map(posStr => {
            let posArr = JSON.parse(posStr)
            return [posArr[1], posArr[0]];
          });

        this.setState({
          lineRoute
        })
      })

    // Get all buses
    fetch('https://api.tfl.gov.uk/line/'+ this.state.line + '/arrivals')
      .then(response => response.json())
      .then(data => {
        this.setState({
          busesIds: [...new Set(
              data.map(item => item.vehicleId)
            )]
        })
      })
  }

  render() {
    console.log(
      this.state.direction,
      this.state.origin,
      this.state.destination
    )
    // console.log(this.state.lineRoute)
    // let data = this.state.data.routeSections
    // console.log(this.state.serverData)// <h1>Line {this.state.line}</h1>

    return (
      <div>
        <Polyline
          positions={this.state.lineRoute}
          color='red'
          weight='4'
          opacity='0.5'
        />
        {this.state.busesIds.map(busId => (
          <Bus id={busId} line={this.state.line} key={busId} />
        ))}
      </div>
    );
  }
}

export default Line
