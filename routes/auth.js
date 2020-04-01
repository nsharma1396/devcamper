const authRouter = require("kvell-scripts").router();
const authController = require("../controllers").auth;
const { protect } = require("../middlewares/auth");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", protect, authController.getMe);
authRouter.post("/forgotpassword", authController.forgotPassword);

module.exports = authRouter;
