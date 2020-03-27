const expressJson = require("kvell-scripts").json;
const routes = require("../routes");
const errorHandler = require("../middlewares/error");

/**
 * `globalMiddlewares` handles all the middlewares/functions/configurations that you need
 * to declare/use in your application globally.
 * @param {import ("kvell-scripts").KvellAppObject} app
 * @param {import ("kvell-scripts").KvellServerObject} server
 */
const globalMiddlewares = (app, server) => {
  app.use(expressJson());

  app.use("/api/v1/bootcamps", routes.bootcamp);

  app.use(errorHandler);
};

module.exports = globalMiddlewares;
