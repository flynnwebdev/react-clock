import React, { Component } from "react";

export default class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: null,
    };
  }

  getJoke = async () => {
    let res = await fetch("http://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
      },
    })
    let data = await res.json()
    this.setState({ joke: data.joke })
  }

  render() {
    return (
      <>
            <p>{this.state.joke}</p>
            <button onClick={this.getJoke}>Get Joke!</button>
      </>
    );
  }
}
