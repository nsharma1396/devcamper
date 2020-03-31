const path = require("path");
const config = require("kvell-scripts/config");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocode");

const bootcampController = {};

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
bootcampController.getBootcamps = asyncHandler(async (req, res, next) => {
  // res.status(200).json({
  //   success: true,
  //   count: bootcamps.length,
  //   pagination,
  //   data: bootcamps
  // });
  res.status(200).json(res.advancedResults);
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
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
    // return res.status(41100).json({ success: false });
  }
  bootcamp.remove();
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

// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
bootcampController.bootcampPhotoUpload = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > config.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${config.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    // Create custom filename to avoid any name collisions
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${config.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
      await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

      res.status(200).json({ success: true, data: file.name });
    });
  }
);

module.exports = bootcampController;
