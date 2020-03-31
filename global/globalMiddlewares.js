const path = require("path");
const { json: expressJson, static: expressStatic } = require("kvell-scripts");
const routes = require("../routes");
const errorHandler = require("../middlewares/error");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

/**
 * `globalMiddlewares` handles all the middlewares/functions/configurations that you need
 * to declare/use in your application globally.
 * @param {import ("kvell-scripts").KvellAppObject} app
 * @param {import ("kvell-scripts").KvellServerObject} server
 */
const globalMiddlewares = (app, server) => {
  // Body parser
  app.use(expressJson());

  // File uploading
  app.use(fileupload());

  // Cookie parser
  app.use(cookieParser());

  // Set static folder
  app.use(expressStatic(path.join(__dirname, "..", "public")));

  app.use("/api/v1/auth", routes.auth);

  app.use("/api/v1/bootcamps", routes.bootcamps);
  app.use("/api/v1/courses", routes.courses);

  app.use(errorHandler);
};

module.exports = globalMiddlewares;
