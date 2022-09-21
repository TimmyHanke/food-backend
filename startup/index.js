const initRoutes = require("./routes");
const initDb = require("./db");
const initConfig = require("./config");

function startup(app) {
  initConfig();
  initRoutes(app);
  initDb();
}

module.exports = startup;
