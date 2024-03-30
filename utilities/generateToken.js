const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret_key = process.env.SECRET_KEY;

const generateToken = (username) => {
  return jwt.sign({ data: username }, secret_key, { expiresIn: "1d" });
};

module.exports = generateToken;
