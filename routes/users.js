const usersRouter = require("kvell-scripts").router();
const usersController = require("../controllers").users;
const User = require("../models/User");
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

usersRouter.use(protect);
usersRouter.use(authorize("admin"));

usersRouter
  .route("/")
  .get(advancedResults(User), usersController.getUsers)
  .post(usersController.createUser);

usersRouter
  .route("/:id")
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = usersRouter;
