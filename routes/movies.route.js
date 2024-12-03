const router = require("express").Router();
const moviesController = require("../middlewares/movies.middlewares");

router.route("/").get(moviesController.getAllMovies);

module.exports = router;
