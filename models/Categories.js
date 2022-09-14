const mongoose = require("mongoose");
const joi = require("joi");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
});

function validateCategory(category) {
  const schema = joi.object({
    name: joi.string().required(),
  });
  return schema.validate(category);
}
const Categories = mongoose.model("Category", categorySchema);

module.exports.Categories = Categories;
module.exports.categorySchema = categorySchema;
module.exports.validateCategory = validateCategory;
