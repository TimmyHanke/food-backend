const mongoose = require("mongoose");
const joi = require("joi");
const { categorySchema } = require("../models/Categories");

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: categorySchema, required: true },
  numberInStock: { type: Number, required: true },
  price: { type: Number, required: true },
});

function validateFood(food) {
  const schema = joi.object({
    name: joi.string().required(),
    category: joi.string().required(),
    numberInStock: joi.number().required(),
    price: joi.number().required(),
  });
  return schema.validate(food);
}
const Foods = mongoose.model("Food", foodSchema);

module.exports.Foods = Foods;
module.exports.validate = validateFood;
