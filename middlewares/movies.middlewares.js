const { moviesCollection } = require("../database");

async function getAllMovies(req, res, next) {
  try {
    const cursor = moviesCollection.find();
    const movies = await cursor.toArray();

    res.status(200).send(movies);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllMovies,
};
