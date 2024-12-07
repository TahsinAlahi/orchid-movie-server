const { usersCollection } = require("../database");
const createHttpError = require("http-errors");
const { ObjectId } = require("mongodb");

async function postFavoriteMovie(req, res, next) {
  try {
    const { email: userEmail } = req.params;
    const { movieId } = req.body;

    if (!ObjectId.isValid(movieId))
      throw createHttpError(400, "Invalid movie id");

    const user = await usersCollection.findOneAndUpdate(
      { userEmail: userEmail },
      {
        $setOnInsert: { favoriteMovies: [] },
      },
      { upsert: true, returnDocument: "after" }
    );

    const updatedUser = await usersCollection.findOneAndUpdate(
      {
        userEmail: userEmail,
      },
      {
        $addToSet: {
          favoriteMovies: new ObjectId(movieId),
        },
      },
      {
        returnDocument: "after",
      }
    );

    res.status(200).json(updatedUser.value);
  } catch (error) {
    next(error);
  }
}

async function getFavoriteMovies(req, res, next) {
  try {
    const { email: userEmail } = req.params;
    const user = await usersCollection.findOne({ userEmail: userEmail });
    if (user === null) throw createHttpError(404, "User not found");

    const userWithFavorites = await usersCollection
      .aggregate([
        {
          $match: { userEmail: userEmail },
        },
        {
          $lookup: {
            from: "movies",
            localField: "favoriteMovies",
            foreignField: "_id",
            as: "favoriteMovies",
          },
        },
      ])
      .toArray();

    res.status(200).json(userWithFavorites);
  } catch (error) {
    next(error);
  }
}

async function deleteFavoriteMovie(req, res, next) {
  try {
    const { email: userEmail } = req.params;
    const { movieId } = req.body;

    if (!ObjectId.isValid(movieId))
      throw createHttpError(400, "Invalid movie id");

    const user = await usersCollection.findOne({ userEmail });
    if (user === null) throw createHttpError(404, "User not found");

    const result = await usersCollection.updateOne(
      { _id: user._id },
      { $pull: { favoriteMovies: new ObjectId(movieId) } }
    );

    if (result.modifiedCount >= 1) {
      res.status(200);
    } else {
      throw createHttpError(404, "Movie not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { postFavoriteMovie, getFavoriteMovies, deleteFavoriteMovie };
