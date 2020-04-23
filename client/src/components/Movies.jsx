import React from "react";

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(movie) {
    console.log("this movie was clicked:", movie);
    if (!this.props.favorites.includes(movie.id)) {
      this.props.saveMovie(movie);
    } else {
      this.props.deleteMovie(movie);
    }
  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        {/* Make this list dynamic! */}

        {this.props.movies.map((movie) => {
          return (
            <li className="movie_item">
              <img src="https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300" />
              <div className="movie_description">
                <h2>{movie.title}</h2>
                <section className="movie_details">
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average}</span>
                    <span>{movie.id}</span>
                  </div>
                </section>
                <button
                  onClick={() => {
                    this.handleClick(movie);
                  }}
                >
                  {this.props.favorites.includes(movie.id)
                    ? "remove favorite"
                    : "add to favorites"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Movies;
