const coursesRouter = require("kvell-scripts").router({ mergeParams: true });
const coursesController = require("../controllers").courses;
const Course = require("../models/Course");
const advancedResults = require("../middlewares/advancedResults");

coursesRouter
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    coursesController.getCourses
  )
  .post(coursesController.createCourse);

coursesRouter
  .route("/:id")
  .get(coursesController.getCourse)
  .put(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = coursesRouter;
