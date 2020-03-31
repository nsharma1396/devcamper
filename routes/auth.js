const authRouter = require("kvell-scripts").router();
const authController = require("../controllers").auth;

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);

module.exports = authRouter;
