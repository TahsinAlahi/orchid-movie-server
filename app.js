require("dotenv/config");
const express = require("express");
const cors = require("cors");
const createHttpErrors = require("http-errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", require("./routes/movies.route"));

module.exports = app;
