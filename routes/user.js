const userControllers = require("../controllers/userControllers");
const courseController = require("../controllers/courseControllers");
const middleware = require("../Middlewares/auth-middleware");

const route = (app) => {
  app.post("/signup", userControllers.singup);

  //

  app.post("/signin", userControllers.singin);

  //

  app.get("/user-page", middleware.isAuthenticated);

  //

  app.get("/courses", courseController.getCourses);

  //
  app.get("/course/instructor", courseController.getCourseByInstructorId);
};

module.exports = route;
