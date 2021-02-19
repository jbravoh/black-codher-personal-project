import React from "react";
import "../stylesheets/Search.css";

//Declaring a react component

class Search extends React.Component {
  constructor(props) {
    super(props);
    // state allows you save values, similar to a json object
    this.state = {
      SearchBar: "",
    };


    this.handleChangeSearchBar = this.handleChangeSearchBar.bind(this);
  }

  handleChangeSearchBar(event) {
    this.setState({ SearchBar: event.target.value });
  }

  handleSubmit(event, projects) {
    event.preventDefault();

    const results = projects.filter(
      (project) =>
        project.project_name
          .toLowerCase()
          .includes(this.state.SearchBar.toLowerCase()) ||
        project.client_name
          .toLowerCase()
          .includes(this.state.SearchBar.toLowerCase())
    );

    this.props.search(results);
  }

  render() {
    return (
      <form
        onSubmit={(event) => this.handleSubmit(event, this.props.projects)}
        className="search"
      >
        <input
          className="input"
          type="text"
          placeholder="Search Projects..."
          value={this.state.projects}
          onChange={this.handleChangeSearchBar}
        ></input>
        <button type="submit" className="searchButton">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
