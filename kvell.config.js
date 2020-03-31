module.exports = {
  "routes": [
    {
      "name": "bootcamps",
      "path": "/api/v1/bootcamps"
    },
    {
      "name": "courses",
      "path": "/api/v1/courses"
    },
    {
      "name": "auth",
      "path": "api/v1/auth"
    }
  ],
  "protocol": "http",
  "models": [
    "bootcamp",
    "course",
    "User"
  ],
  "autoRequireRoutes": false
};