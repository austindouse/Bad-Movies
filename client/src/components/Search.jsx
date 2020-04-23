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
      currentValue: event.target.value,
    });
  }

  handleSearch() {
    let selectedGenre = this.state.currentGenre;

    this.props.getMovies(selectedGenre);
  }

  render() {
    if (this.state.genres.length > 0) {
    }
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleChange}>
          {this.state.genres.map((genre) => {})}
        </select>

        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
