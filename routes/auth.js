const authRouter = require("kvell-scripts").router();
const authController = require("../controllers").auth;
const { protect } = require("../middlewares/auth");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/me", protect, authController.getMe);
authRouter.put("/updatedetails", protect, authController.updateDetails);
authRouter.put("/updatepassword", protect, authController.updatePassword);
authRouter.post("/forgotpassword", authController.forgotPassword);
authRouter.put("/resetpassword/:resetToken", authController.resetPassword);

module.exports = authRouter;
