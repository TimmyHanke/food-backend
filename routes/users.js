const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { validate, User } = require("../models/User");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User not found");

  return res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("User already registered");
  const user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save();

  const { password, ...userWithoutPassword } = user.toObject();
  const token = user.generateAuthToken();

  return res
    .status(201)
    .header("x-auth-token", token)
    .send(userWithoutPassword);
});

module.exports = router;
