require("dotenv/config");
const express = require("express");
const cors = require("cors");
const createHttpErrors = require("http-errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
