const coursesRouter = require("kvell-scripts").router({ mergeParams: true });
const coursesController = require("../controllers").courses;
const Course = require("../models/Course");
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

coursesRouter
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    coursesController.getCourses
  )
  .post(
    protect,
    authorize("publisher", "admin"),
    coursesController.createCourse
  );

coursesRouter
  .route("/:id")
  .get(coursesController.getCourse)
  .put(protect, authorize("publisher", "admin"), coursesController.updateCourse)
  .delete(
    protect,
    authorize("publisher", "admin"),
    coursesController.deleteCourse
  );

module.exports = coursesRouter;
