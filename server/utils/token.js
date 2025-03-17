const jwt = require("jsonwebtoken");

module.exports = function generateToken(payload) {
  const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  return token;
};
