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
    },
    {
      "name": "reviews",
      "path": "/api/v1/reviews"
    }
  ],
  "protocol": "http",
  "models": [
    "Bootcamp",
    "Course",
    "User",
    "Review"
  ],
  "autoRequireRoutes": false
};