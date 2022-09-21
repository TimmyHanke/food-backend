const mongoose = require("mongoose");

function initDb() {
  mongoose
    .connect("mongodb://localhost/food-database")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((error) => console.log("Could not connect to MongoDB...", error));
}

module.exports = initDb;
