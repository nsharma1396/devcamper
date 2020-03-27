const Bootcamp = require("../models/bootcamp");
const ErrorResponse = require("../utils/errorResponse");

const bootcampController = {};

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
bootcampController.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    if (!bootcamps) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ success: false });
  }
};

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
bootcampController.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
    // res.status(400).json({ success: false });
  }
};

// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
bootcampController.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      msg: bootcamp
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ success: false, err });
  }
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
bootcampController.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
    // res.status(400).json({ success: false });
  }
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
bootcampController.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
      // return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
    // res.status(400).json({ success: false });
  }
};

module.exports = bootcampController;
