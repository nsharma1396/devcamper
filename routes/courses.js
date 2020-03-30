const coursesRouter = require("kvell-scripts").router({ mergeParams: true });
// eslint-disable-next-line no-unused-vars
const coursesController = require("../controllers").courses;

coursesRouter
  .route("/")
  .get(coursesController.getCourses)
  .post(coursesController.createCourse);

coursesRouter
  .route("/:id")
  .get(coursesController.getCourse)
  .put(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = coursesRouter;
