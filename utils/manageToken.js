const jwt = require("jsonwebtoken");

exports.generateToken = (data, expiresIn) => {
  return jwt.sign(data, process.env.SECRET, { expiresIn });
};

exports.verifyToken = token => {
  return jwt.verify(token, process.env.SECRET);
};

// Path: utils/verifyToken.js
