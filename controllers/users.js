const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

const usersController = {};

// @desc        Get all users
// @route       GET /api/v1/users
// @access      Private/Admin
usersController.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Get a single users
// @route       GET /api/v1/users/:id
// @access      Private/Admin
usersController.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc        Create users
// @route       POST /api/v1/users
// @access      Private/Admin
usersController.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc        Update users
// @route       PUT /api/v1/users/:id
// @access      Private/Admin
usersController.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc        Delete users
// @route       POST /api/v1/users
// @access      Private/Admin
usersController.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = usersController;
