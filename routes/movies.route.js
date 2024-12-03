const router = require("express").Router();
const moviesController = require("../middlewares/movies.middleware");

router.route("/").get(moviesController.getAllMovies);

module.exports = router;
