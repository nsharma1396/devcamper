const Bootcamp = require("../models/bootcamp");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocode");

const bootcampController = {};

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
bootcampController.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    // Sort by user based request
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    // Sort by date
    query = query.sort("-createdAt");
  }

  // Execute query
  const bootcamps = await query; // Bootcamp.find({queryStr});

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
bootcampController.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
bootcampController.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    msg: bootcamp
  });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
bootcampController.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
    // return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
bootcampController.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
    // return res.status(41100).json({ success: false });
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
bootcampController.getBootcampsInRadius = asyncHandler(
  async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude,
      lng = loc[0].longitude;

    // Calculate radius using radians
    // Divide distance by radius of Earth
    // Earth radius = 3963 miles -> 6738 kms
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius]
        }
      }
    });

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  }
);

module.exports = bootcampController;
