const Instructor = require("../models/instructor");

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

module.exports = {
  addNewInstructor,
};
