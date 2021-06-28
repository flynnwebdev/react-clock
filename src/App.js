import React, { Component } from "react";
import Clock from "./Clock";
import Joke from "./Joke"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      error: null,
      foo: null,
      date: new Date(),
    };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude }),
      (error) => this.setState({ error: error.message, foo: "bar" })
    );
    this.timerId = setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  componentDidUpdate() {
    console.log("App updated");
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <p style={{ color: "red" }}>{this.state.error}</p>
        ) : (
          <>
            <h4>{this.state.latitude}</h4>
            <Joke />
            <Clock
              icon="sun.svg"
              timezone={"Sydney/Australia"}
              date={this.state.date}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
