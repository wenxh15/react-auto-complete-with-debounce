import React, { Component } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "./styles.css";

export default class App extends Component {
  state = {
    value: "",
    list: []
  };

  constructor(props) {
    super(props);
    this.handleChange = debounce(this.handleChange, 500);
  }
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => console.log(res.data));
  }

  handleChange = e => {
    axios.get("https://jsonplaceholder.typicode.com/users");

    this.setState({
      value: e.target.value
    });
  };
  render() {
    const { value } = this.state;
    console.log(value);
    return (
      <div className="App">
        <input
          placeholder="placeholder"
          input={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

// debounce = (func, delay) => {
//     let inDebounce
//     return function() {
//       const context = this
//       const args = arguments
//       clearTimeout(inDebounce)
//       inDebounce = setTimeout(() => func.apply(context, args), delay)
//     }
//   }
