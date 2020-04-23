//Select one db to work with:

//For SQL
const sqlDb = require("../../db/sql");
//For Mongo
const mongoDb = require("../../db/mongodb");
const { db, Movie } = require("../../db/mongodb/index.js");

module.exports = {
  save: (req) => {
    let movie = req.body;

    let newBadMovie = new Movie({
      title: movie.title,
      id: movie.id,
      vote_average: movie.vote_average,
    });

    return Movie.findOneAndUpdate({ title: movie.title }, movie, {
      new: true,
      upsert: true,
    }).exec();
  },
  delete: (req) => {
    let movie = req.body;

    return Movie.deleteOne({ title: movie.title }).exec();
  },
  getFavorites: () => {
    return Movie.find({}).exec();
  },
};

// module.exports.getFavorites().then((data) => {
//   console.log("db data", data);
// });
