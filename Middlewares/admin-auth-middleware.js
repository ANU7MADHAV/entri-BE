const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const dotenv = require("dotenv");

dotenv.config();

function adminAuth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const username = decoded.username;

    Admin.findById(username, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Access denied. User not found." });
      }
      if (!user.isAdmin) {
        return res
          .status(403)
          .json({ message: "Access denied. User is not an admin." });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Access denied. Invalid token." });
  }
}

module.exports = adminAuth;
