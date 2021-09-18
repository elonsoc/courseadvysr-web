import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import Axios from "axios";
import environ from "../../helpers/prod-or-dev";

//TODO: Convert from JS to TSX
/* I honestly don't like this but whatever*/
var courseOptions = [];

export default class SearchSelections extends Component {
  handleChange = (newValue) => {
    this.setState(() => {
      this.props.selections(newValue);
      return { selection: newValue };
    });

    console.groupEnd();
  };

  componentDidMount = () => {
    Axios({
      method: "get",
      url: environ() + "/options",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        response.data.map((item) => {
          return courseOptions.push({ value: item.subject, label: item.title });
        });
      })
      .catch((response) => {
        console.log(response, "failure!");
      });
  };

  render() {
    return (
      <CreatableSelect
        formatCreateLabel={(inputValue) => {
          return inputValue.search(":") !== -1
            ? `${inputValue.substring(
                0,
                inputValue.search(":")
              )} ${inputValue.charAt(
                inputValue.search(":") + 1
              )}000`
            : inputValue;
        }}
        isMulti
        onChange={this.handleChange}
        styles={this.props.style}
        placeholder={`ECO, CSC:2, Art, Ceramics`}
        options={courseOptions}
      />
    );
  }
}
