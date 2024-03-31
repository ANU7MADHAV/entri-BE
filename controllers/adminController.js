const Instructor = require("../models/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const generateToken = require("../utilities/generateToken");

const addNewInstructor = async (req, res) => {
  const body = req.body;
  const { name, email } = body;
  const addNewInstructor = await Instructor.create({
    name,
    email,
  });
  const addedNewInstructor = await addNewInstructor.save();
  if (!addedNewInstructor) {
    return res.send("Not added instructor");
  }
  return res.send(addedNewInstructor);
};

const signup = async (req, res) => {
  try {
    const body = req.body;
    const { username, password } = body;

    const adminExist = await Admin.findOne({ username });
    if (adminExist) {
      return res.send("Admin is already exist");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword);
    const newAdmin = new Admin({
      username,
      hashPassword,
    });
    const newAdminCreated = await newAdmin.save();

    if (!newAdminCreated) {
      return res.send("admin is not created");
    }

    const token = generateToken(username);
    res.send({ token });
  } catch (error) {
    console.log(error, "Something wrong");
  }
};

const signin = async (req, res) => {
  const body = req.body;
  const { username, password } = body;

  const admin = await Admin.findOne({ username });

  console.log(admin);
  if (!user) {
    res.send("admin is not found");
  }
  const matchPassword = await bcrypt.compare(password, user.hashPassword);
  if (!matchPassword) {
    return res.send("password is not match");
  }
  console.log(matchPassword);
  const token = generateToken(username);
  res.send({ token });
};

module.exports = {
  addNewInstructor,
  signup,
  signin,
};
