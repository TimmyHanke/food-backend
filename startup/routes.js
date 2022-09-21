const express = require("express");
const cors = require("cors");
const auth = require("../routes/auth");
const users = require("../routes/users");
const foods = require("../routes/foods");
const categories = require("../routes/categories");
const error = require("../middleware/error");

function initRoutes(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/categories", categories);
  app.use("/api/foods", foods);
  app.use("/api/users", users);
  app.use(error);
}

module.exports = initRoutes;
