const mongoose = require("mongoose");
const joi = require("joi");
typeEmail = require("mongoose-type-email");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { type: String, minlength: 2 },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  password: { type: String, minlength: 5, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(2),
    email: joi.string().required(),
    password: joi.string().min(5).required(),
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validate: validateUser,
};
