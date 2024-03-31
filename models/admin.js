const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  hashPassword: {
    type: String,
    required: true,
    minLength: 6,
  },
  admin: {
    type: Boolean,
    default: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
