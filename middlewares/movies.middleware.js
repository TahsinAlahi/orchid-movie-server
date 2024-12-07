const { moviesCollection } = require("../database");
const { ObjectId } = require("mongodb");
const createHttpError = require("http-errors");

async function getAllMovies(req, res, next) {
  try {
    const cursor = moviesCollection.find();
    const movies = await cursor.toArray();

    res.status(200).json(movies);
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

    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

async function getTopRatedMovies(req, res, next) {
  try {
    const cursor = moviesCollection.find().sort({ rating: -1 }).limit(6);
    const topMovies = await cursor.toArray();

    res.status(200).json(topMovies);
  } catch (error) {
    next;
  }
}

async function createMovie(req, res, next) {
  try {
    const {
      moviePoster,
      movieTitle,
      genre,
      duration,
      releaseYear,
      rating,
      summary,
      email,
      username,
    } = req.body;

    if (
      !moviePoster ||
      !movieTitle ||
      !genre ||
      !duration ||
      !releaseYear ||
      !rating ||
      !summary ||
      !email ||
      !username
    )
      throw createHttpError(400, "Missing required fields");

    await moviesCollection.insertOne(req.body);

    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
}

async function updateMovie(req, res, next) {
  const id = req.params.id;

  try {
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) throw createHttpError(400, "Invalid movie id");

    const {
      moviePoster,
      movieTitle,
      genre,
      duration,
      releaseYear,
      rating,
      summary,
    } = req.body;

    const changedFields = {
      ...(moviePoster && { moviePoster }),
      ...(movieTitle && { movieTitle }),
      ...(genre && { genre }),
      ...(duration && { duration }),
      ...(releaseYear && { releaseYear }),
      ...(rating && { rating }),
      ...(summary && { summary }),
    };

    const updatedMovie = await moviesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: changedFields },
      { returnDocument: "after" }
    );

    if (!updatedMovie) throw createHttpError(404, "Movie not found");

    res.status(200).json(updatedMovie.value);
  } catch (error) {
    next(error);
  }
}

async function deleteMovie(req, res, next) {
  const id = req.params.id;

  try {
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) throw createHttpError(400, "Invalid movie id");

    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      throw createHttpError(404, "Movie not found");

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  getTopRatedMovies,
};
