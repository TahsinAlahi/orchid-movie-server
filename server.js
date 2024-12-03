const app = require("./app");
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
const { MongoClient } = require("mongodb");

const client = new MongoClient(mongoUri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
