const coursesRouter = require("kvell-scripts").router();
// eslint-disable-next-line no-unused-vars
const coursesController = require("../controllers").courses;

coursesRouter.get("/", (request, response) => {
  // get method
});

coursesRouter.post("/", (request, response) => {
  // post method
});

coursesRouter.put("/", (request, response) => {
  // put method
});

coursesRouter.delete("/", (request, response) => {
  // delete method
});

module.exports = coursesRouter;