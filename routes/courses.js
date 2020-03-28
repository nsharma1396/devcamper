const coursesRouter = require("kvell-scripts").router({ mergeParams: true });
// eslint-disable-next-line no-unused-vars
const coursesController = require("../controllers").courses;

coursesRouter.route("/").get(coursesController.getCourses);

module.exports = coursesRouter;
