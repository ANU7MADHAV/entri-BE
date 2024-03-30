const Course = require("../models/course");
const Instructor = require("../models/instructor");
const upload = require("../config/s3-image-upload");

const singleUploader = upload.single("image");

const createCourse = async (req, res) => {
  try {
    singleUploader(req, res, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }

      console.log("this is the image file", req.file.location);

      const body = req.body;
      const { title, description, price, instructor } = body;
      const createCourse = new Course({
        title,
        description,
        price,
        instructor,
        image: req.file.location,
      });
      const newCourseCreated = await createCourse.save();
      if (!newCourseCreated) {
        return res.send("course is not created");
      }
      return res.send(newCourseCreated);
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
      status: 400,
    });
  }
};

const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};

const getCourseByInstructorId = async (req, res) => {
  const body = req.body;
  const { email } = body;
  const findInstructor = await Instructor.findOne({ email });
  console.log(findInstructor);
  if (!findInstructor) {
    return res.send("No instructor is found");
  }
  const courses = await Course.find({ instructor: findInstructor._id });
  console.log(courses);
  if (!courses) {
    return res.send("no course is found");
  }
  return res.send(courses);
};

const updateCourse = async (req, res) => {
  const body = req.body;
  const { title, description, price, instructor } = body;
  console.log(instructor);
  const findInstructor = await Instructor.findOne({ _id: instructor });

  if (!findInstructor) {
    return res.send("Instructor is not valid");
  }
  const updatedCourse = await Course.findOneAndUpdate(
    { title },
    { description, price, instructor },
    {
      new: true,
    }
  );
  if (!updatedCourse) {
    return res.send("Course is not updated");
  }
  console.log(updatedCourse);
  return res.send(updatedCourse);
};
module.exports = {
  createCourse,
  updateCourse,
  getCourseByInstructorId,
  getCourses,
};
