const error = (error, req, res, next) => {
  console.log(error);
  return res.status(500).send("Internal server error");
};

module.exports = error;
