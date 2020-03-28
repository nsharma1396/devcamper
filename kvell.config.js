module.exports = {
  routes: [
    {
      name: "bootcamps",
      path: "/api/v1/bootcamps"
    },
    {
      name: "courses",
      path: "/api/v1/courses"
    }
  ],
  protocol: "http",
  models: ["bootcamp", "course"],
  autoRequireRoutes: false
};
