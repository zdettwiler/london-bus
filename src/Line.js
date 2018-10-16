import React, {Component} from 'react'

class Line extends Component {

  constructor(props) {
    super(props)
    this.state = {
      line: this.props.line,
      origin: '',
      destination: '',
      data: {}
    }
    // console.log(this.state.id)
  }

  componentDidMount() {
    fetch('https://api.tfl.gov.uk/line/'+ this.state.line +'/route')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data
        })
      })
  }

  render() {
    let data = this.state.data.routeSections
    // console.log(data)
    return (
      <h1>Line {this.state.line}</h1>
    )
  }
}

export default Line
