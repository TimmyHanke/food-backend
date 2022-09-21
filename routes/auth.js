const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");

const { User } = require("../models/User");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);

  const token = user.generateAuthToken();

  return res.send(token);
});

function validate(user) {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(5).required(),
  });
  return schema.validate(user);
}

module.exports = router;
