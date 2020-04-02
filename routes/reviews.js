const reviewsRouter = require("kvell-scripts").router({ mergeParams: true });
const advancedResults = require("../middlewares/advancedResults");
const reviewsController = require("../controllers").reviews;
const Review = require("../models/Review");
const { protect, authorize } = require("../middlewares/auth");

reviewsRouter
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    reviewsController.getReviews
  )
  .post(protect, authorize("user", "admin"), reviewsController.addReview);

reviewsRouter
  .route("/:id")
  .get(reviewsController.getReview)
  .put(protect, authorize("user", "admin"), reviewsController.updateReview)
  .delete(protect, authorize("user", "admin"), reviewsController.deleteReview);

module.exports = reviewsRouter;
