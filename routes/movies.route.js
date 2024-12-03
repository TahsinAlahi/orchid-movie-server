const router = require("express").Router();
const moviesController = require("../middlewares/movies.middleware");

router.route("/").get(moviesController.getAllMovies);

router.route("/:id").get(moviesController.getMovieById);

module.exports = router;
