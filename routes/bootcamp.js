const bootcampRouter = require("kvell-scripts").router();
// eslint-disable-next-line no-unused-vars
const bootcampController = require("../controllers").bootcamp;

bootcampRouter
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);

bootcampRouter
  .route("/")
  .get(bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp);

bootcampRouter
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

module.exports = bootcampRouter;
