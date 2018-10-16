import React, { Component } from 'react'
import Line from './Line'
import Bus from './Bus'

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: [],
      line: 12
      ,
      // lastUpdate: new Date()
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
    return (
      <div className="App">
        {this.state.lastUpdate}
        <Line line={this.state.line} />

        {this.state.serverData[0] &&
          this.state.serverData.map(busId =>
            <Bus id={busId} key={busId}/>
          )
        }
      </div>
    );
  }
}

export default App;
