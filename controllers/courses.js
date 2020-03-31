const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

const coursesController = {};

// @desc      Get all courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
coursesController.getCourses = asyncHandler(async (req, res, next) => {
  // let query;

  // if (req.params.bootcampId) {
  //   query = Course.find({ bootcamp: req.params.bootcampId });
  // } else {
  //   query = Course.find().populate({
  //     path: "bootcamp",
  //     select: "name description"
  //   });
  // }

  // Only implement advancedResults for GET all courses, not when a bootcampId is given
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
  // const courses = await query;

  // res.status(200).json({
  //   success: true,
  //   count: courses.length,
  //   data: courses
  // });
});

// @desc      Get a single course
// @route     GET /api/v1/courses/:id
// @access    Public
coursesController.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Add course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private
coursesController.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Update course
// @route     PUT /api/v1/:courseId
// @access    Private
coursesController.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Delete a course
// @route     DELETE /api/v1/:courseId
// @access    Private
coursesController.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: course
  });
});

module.exports = coursesController;
