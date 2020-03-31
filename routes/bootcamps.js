const bootcampRouter = require("kvell-scripts").router();
const bootcampController = require("../controllers").bootcamps;
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

const Bootcamp = require("../models/Bootcamp");

// Include other resource routers
const courseRouter = require("./courses");

// Re-route into other resource routers
bootcampRouter.use("/:bootcampId/courses", courseRouter);

bootcampRouter
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);

bootcampRouter
  .route("/:id/photo")
  .put(
    protect,
    authorize("publisher", "admin"),
    bootcampController.bootcampPhotoUpload
  );

bootcampRouter
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), bootcampController.getBootcamps)
  .post(
    protect,
    authorize("publisher", "admin"),
    bootcampController.createBootcamp
  );

bootcampRouter
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(
    protect,
    authorize("publisher", "admin"),
    bootcampController.updateBootcamp
  )
  .delete(
    protect,
    authorize("publisher", "admin"),
    bootcampController.deleteBootcamp
  );

module.exports = bootcampRouter;
