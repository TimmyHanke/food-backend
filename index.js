const express = require("express");
const foods = require("./routes/foods");
const categories = require("./routes/categories");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/foods", foods);

mongoose
  .connect("mongodb://localhost/food-database")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

app.listen(8000, () => console.log("listening on port 8000"));
