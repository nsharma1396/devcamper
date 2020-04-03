const path = require("path");
const { json: expressJson, static: expressStatic } = require("kvell-scripts");
const routes = require("../routes");
const errorHandler = require("../middlewares/error");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

/**
 * `globalMiddlewares` handles all the middlewares/functions/configurations that you need
 * to declare/use in your application globally.
 * @param {import ("kvell-scripts").KvellAppObject} app
 * @param {import ("kvell-scripts").KvellServerObject} server
 */
const globalMiddlewares = (app, server) => {
  // Body parser
  app.use(expressJson());

  // Cookie parser
  app.use(cookieParser());

  // File uploading
  app.use(fileupload());

  // Sanitize data to prevent SQL Injection attacks
  app.use(mongoSanitize());

  // Prevent XSS attacks
  app.use(xssClean());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
  });

  app.use(limiter);

  // Prevent http param pollution
  app.use(hpp());

  const publicDirPath = path.join(__dirname, "..", "public");

  // Set static folder
  app.use(expressStatic(publicDirPath));

  // Otherwise kvell will redirect to in-built docs html
  app.get("/docs", (req, res) => {
    res.sendFile(path.join(publicDirPath, "index.html"), err => {
      if (err) {
        console.log(err);
      }
    });
  });

  app.use("/api/v1/auth", routes.auth);

  app.use("/api/v1/bootcamps", routes.bootcamps);
  app.use("/api/v1/courses", routes.courses);
  app.use("/api/v1/courses", routes.courses);
  app.use("/api/v1/users", routes.users);
  app.use("/api/v1/reviews", routes.reviews);

  app.use(errorHandler);
};

module.exports = globalMiddlewares;
