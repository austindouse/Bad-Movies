import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    let seedGenre = { genre: 99 };
    this.getMovies(seedGenre);
    this.saveMovie();
  }

  getMovies(genreObj) {
    // make an axios request to your server on the GET SEARCH endpoint
    return Axios.get("/Search", { params: genreObj })
      .then((movieList) => {
        this.setState({
          movies: movieList.data,
        });
      })
      .catch((Err) => {
        console.log("couldn't get your movies:", Err);
      });
  }

  saveMovie(movieObj) {
    // same as above but do something diff
    return Axios.post("/save", movieObj).then((data) => {
      this.setState({
        favorites: data.data,
      });
    });
  }

  deleteMovie(movieObj) {
    // same as above but do something diff
    return Axios.post("/delete", movieObj).then((data) => {
      console.log("movie deleted");
    });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            favorites={this.state.favorites}
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
