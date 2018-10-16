import React, {Component} from 'react'

class Bus extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      nextStation: '',
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
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <p>
        {this.state.id} arriving at {this.state.nextStation} in {this.state.timeToStation} sec. [as of {this.state.timeOfPrediction}]
      </p>
    )
  }
}

export default Bus
