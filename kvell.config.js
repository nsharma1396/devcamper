module.exports = {
  routes: [
    {
      name: "bootcamp",
      path: "/api/v1/bootcamps"
    }
  ],
  protocol: "http",
  models: ["bootcamp"],
  autoRequireRoutes: false
};
