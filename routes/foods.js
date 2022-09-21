const joi = require("joi");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Foods, validate } = require("../models/Foods");
const { Categories } = require("../models/Categories");

router.get("/", [auth, admin], async (req, res, next) => {
  const foods = await Foods.find();
  return res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await Foods.findById(req.params.id);
  if (!food)
    return res.status(404).send("The food DOES NOT exist in the database");
  return res.send(food);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let category = await new Categories({ name: req.body.category });
  category.save();
  console.log(category);

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  let food = new Foods({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name,
    },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });

  food = await food.save();
  return res.send(food);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const category = Categories.findById(req.params.id);

  if (!category)
    return res.status(404).send("The food DOES NOT exist in the database");
  const food = await Foods.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name,
    },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });
  if (!food)
    return res.status(404).send("The food with the given id was not found.");

  return res.send(food);
});

router.delete("/:id", async (req, res) => {
  const food = await Foods.findByIdAndDelete(req.params.id);
  const category = await Categories.findByIdAndDelete(req.params.id);

  if (!food)
    return res.status(404).send("The food DOES NOT exist in the database");

  return res.send(food);
});

module.exports = router;
