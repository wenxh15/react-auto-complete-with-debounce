import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {
    value: "",
    dropdownList: [],
    match: []
  };

  debounce(func, delay) {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  handleSearch = this.debounce(() => {
    const { value } = this.state;
    console.log(value, "value");
    if (value.trim().length > 0) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        .then(res => {
          if (res.data.meals !== null) {
            res.data.meals.map(item =>
              this.setState(state => ({
                dropdownList: [...state.dropdownList, item.strMeal]
              }))
            );
            let match = this.state.dropdownList.filter(
              item =>
                item.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
            );
            this.setState({
              match: [...new Set(match)]
            });
          } else {
            this.setState({
              match: []
            });
          }
        });
    } else {
      this.setState({
        match: []
      });
    }
  }, 1000);

  handleChange = e => {
    this.setState(
      {
        value: e.target.value
      },
      () => this.handleSearch()
    );
  };

  handleClick = item => {
    this.setState(() => ({
      value: item,
      match: []
    }));
  };

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <input
          placeholder="placeholder"
          value={value}
          onChange={this.handleChange}
        />
        {this.state.match.map((item, index) => (
          <p key={index} onClick={() => this.handleClick(item)}>
            {item}
          </p>
        ))}
      </div>
    );
  }
}
