const movieModel = require("../models/movieModel.js");
const apiHelpers = require("../helpers/apiHelpers.js");
const { API_KEY } = require("../../config");

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
    let genreId = req.query.genre;

    apiHelpers
      .getMovies(genreId)
      .then((movieList) => {
        let formatted = movieList.map((movie) => {
          return {
            title: movie.title,
            id: movie.id,
            vote_average: movie.vote_average,
          };
        });
        res.send(formatted);
      })
      .catch((Err) => {
        console.log("MOVIE RESPONSE ERROR", Err);
      });
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
    apiHelpers.getGenres().then((data) => {
      res.send(data);
    });
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {},
};
