const { Categories, validateCategory } = require("../models/Categories");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Categories.find();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Categories.findById(req.params.id);
  if (!category)
    return res.status(404).send("The category DOES NOT exist in the database");
  return res.send(category);
});

module.exports = router;
