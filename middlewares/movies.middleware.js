const { moviesCollection } = require("../database");
const { ObjectId } = require("mongodb");
const createHttpError = require("http-errors");

async function getAllMovies(req, res, next) {
  try {
    const cursor = moviesCollection.find();
    const movies = await cursor.toArray();

    res.status(200).send(movies);
  } catch (error) {
    next(error);
  }
}

async function getMovieById(req, res, next) {
  const id = req.params.id;
  try {
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) throw createHttpError(400, "Invalid movie id");

    const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

    if (!movie) throw createHttpError(404, "Movie not found");

    res.status(200).send(movie);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
};
