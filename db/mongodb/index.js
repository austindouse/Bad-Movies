//

const mongoose = require("mongoose");
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/badmovies", {
    useNewUrlParser: true,
  });
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected to the database");
});

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

let movieSchema = mongoose.Schema({
  title: { type: String, unique: true },
  id: Number,
  vote_average: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports.db = db;

module.exports.Movie = Movie;
