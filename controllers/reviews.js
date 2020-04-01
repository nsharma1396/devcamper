const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");

const reviewsController = {};

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/bootcamps/:bootcampId/reviews
// @access    Public
reviewsController.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

reviewsController.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!review) {
    return (
      next(
        new ErrorResponse(`No review found with the id of ${req.params.id}`)
      ),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

module.exports = reviewsController;
