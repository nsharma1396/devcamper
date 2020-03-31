const bootcampRouter = require("kvell-scripts").router();
const bootcampController = require("../controllers").bootcamps;
const advancedResults = require("../middlewares/advancedResults");
const Bootcamp = require("../models/Bootcamp");

// Include other resource routers
const courseRouter = require("./courses");

// Re-route into other resource routers
bootcampRouter.use("/:bootcampId/courses", courseRouter);

bootcampRouter
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);

bootcampRouter.route("/:id/photo").put(bootcampController.bootcampPhotoUpload);

bootcampRouter
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp);

bootcampRouter
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

module.exports = bootcampRouter;
