require("express-async-errors");
const dotenv = require("dotenv");

function initConfig() {
  dotenv.config();

  if (!process.env.JWT_SECRET) {
    console.log("Jwt secret is not set");
    process.exit(1);
  }
}

module.exports = initConfig;
