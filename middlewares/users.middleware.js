const { usersCollection } = require("../database");
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

module.exports = { postFavoriteMovie };
