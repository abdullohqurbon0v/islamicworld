const jwt = require("jsonwebtoken");

module.exports = function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });
  return token;
};
