const router = require("express").Router();
const usersController = require("../middlewares/users.middleware");

router
  .route("/favorites/:email")
  .post(usersController.postFavoriteMovie)
  .get(usersController.getFavoriteMovies);

module.exports = router;
