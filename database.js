const { MongoClient } = require("mongodb");
const mongoUri = process.env.MONGO_URI;

const client = new MongoClient(mongoUri);
const database = client.db("orchid-movies");
const moviesCollection = database.collection("movies");

module.exports = { client, moviesCollection };
