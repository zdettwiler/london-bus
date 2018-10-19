import React, {Component} from 'react'
import Bus from './Bus'

class Line extends Component {

  constructor(props) {
    super(props)
    this.state = {
      line: this.props.line,
      origin: '',
      destination: '',
      data: {},
      serverData: [],
    }
  }

  componentDidMount() {
    // Get line info
    fetch('https://api.tfl.gov.uk/line/'+ this.state.line +'/route')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data
        })
      })

    // Get all buses
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
    let data = this.state.data.routeSections
    console.log(this.state.serverData)// <h1>Line {this.state.line}</h1>

    return (
      <div>
        {this.state.serverData.map(busId => (
          <Bus id={busId} line={this.state.line} key={busId}/>
        ))}
      </div>
    );
  }
}

export default Line
