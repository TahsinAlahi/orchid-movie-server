const router = require("express").Router();
const moviesController = require("../middlewares/movies.middleware");

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);

router
  .route("/:id")
  .get(moviesController.getMovieById)
  .delete(moviesController.deleteMovie)
  .patch(moviesController.updateMovie);

module.exports = router;
