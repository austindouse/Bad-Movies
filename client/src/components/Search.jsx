import React from "react";
import Axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      currentGenre: { genre: 28 },
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }
  getGenres() {
    return Axios.get("/genres")
      .then((data) => {
        this.setState({ genres: data.data.genres });
      })
      .catch((err) => {
        console.log("couldn't get genres", err);
      });
  }

  handleChange(event) {
    this.setState({
      currentGenre: event.target.value,
    });
  }

  handleSearch() {
    let selectedGenre = this.state.currentGenre;
    let model = {
      id: selectedGenre,
    };
    this.props.getMovies(model);
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />
        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleChange}>
          {this.state.genres.map((genre) => {
            return (
              <option value={JSON.stringify(genre.id)}>{genre.name}</option>
            );
          })}
        </select>
        <br />
        <br />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
