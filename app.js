require("dotenv/config");
const express = require("express");
const cors = require("cors");
const createHttpError = require("http-errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", require("./routes/movies.route"));
app.use("/api/users", require("./routes/users.route"));

app.use("*", (req, res, next) => {
  next(createHttpError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  let errorStatus = 500;
  let errorMessage = "Unknown error has occurred";

  if (createHttpError.isHttpError(err)) {
    errorStatus = err.status;
    errorMessage = err.message;
  }

  console.error(err);
  res.status(errorStatus).json({ message: errorMessage });
});

module.exports = app;
