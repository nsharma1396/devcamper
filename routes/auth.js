const authRouter = require("kvell-scripts").router();
const authController = require("../controllers").auth;
const { protect } = require("../middlewares/auth");

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/me").get(protect, authController.getMe);

module.exports = authRouter;
