const courseController = require("../controllers/courseControllers");
const adminController = require("../controllers/adminController");
const route = (app) => {
  app.get("/admin", (req, res) => {
    return res.send("hello admin page");
  });

  //

  app.post("/admin/course", courseController.createCourse);
  app.put("/admin/course", courseController.updateCourse);

  //

  app.post("/admin/instructor", adminController.addNewInstructor);
};

module.exports = route;
