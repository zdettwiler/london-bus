import React, {Component} from 'react'
import Bus from './Bus'

class Line extends Component {

  constructor(props) {
    super(props)
    this.state = {
      line: this.props.line,
      direction: '',
      origin: '',
      destination: '',
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
    console.log(this.state.busesIds)
    // let data = this.state.data.routeSections
    // console.log(this.state.serverData)// <h1>Line {this.state.line}</h1>

    return (
      <div>
        {this.state.busesIds.map(busId => (
          <Bus id={busId} line={this.state.line} key={busId}/>
        ))}
      </div>
    );
  }
}

export default Line
