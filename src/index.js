import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

if (module.hot) {
  module.hot.accept()
}

class App extends React.Component {
  // short hand for state. bable can add constructor
  state = { lat: null, errorMessage: '' }

  // life cycle only work when componenet inital render
  componentDidMount() {
    // this will ask for permission for taking the location
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    )
  }

  renderContent() {
    // thi will render when we have no out put or error
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    // this win success state and prop will pass
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    // this will pass the message props and then display it
    return <Spinner message='Please accept location request' />
  }

  render() {
    return <div className='border red'>{this.renderContent()}</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
