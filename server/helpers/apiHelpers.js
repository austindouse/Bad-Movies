const request = require("request");
const axios = require("axios");
const { API_KEY } = require("../../config.js");

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

let getMovies = (genreId) => {
  // send request to get movies based on genred ID's
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;

  return axios
    .get(url)
    .then((movieList) => {
      //   console.log("LIST OF MOVIES", movieList);
      //   console.log("RESULTS", movieList.data.results);
      return movieList.data.results;
    })
    .catch((err) => {
      console.log("API MOVIE GET ERROR:", err);
    });
};

let getGenres = () => {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  return axios
    .get(url)
    .then((genres) => {
      return genres.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getMovies = getMovies;
module.exports.getGenres = getGenres;

// getMovies(24).then((data) => {
//   console.log(data);
// });
// getGenres().then((data) => {
//   console.log("DATA FROM TEST:", data);
// });
// getGenres();
