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
    },
    {
      "name": "users",
      "path": "/api/v1/users"
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