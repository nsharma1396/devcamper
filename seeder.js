require("kvell-scripts/config");
const fs = require("fs");
const PluginInstance = require("kvell-db-plugin-mongoose/init");
const pluginOptions = require("./kvell-plugins").databasePlugins[0].options;

const seedData = async () => {
  await PluginInstance.createDBInstance(pluginOptions);

  // const mongoose = require("kvell-db-plugin-mongoose").dbInstance;
  const Bootcamp = require("./models/Bootcamp");
  const Course = require("./models/Course");
  const User = require("./models/User");
  const Review = require("./models/Review");

  const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`)
  );

  const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, `utf-8`)
  );

  const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, `utf-8`)
  );

  const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/reviews.json`, `utf-8`)
  );

  const importData = async () => {
    try {
      await Bootcamp.create(bootcamps);
      await Course.create(courses);
      await User.create(users);
      await Review.create(reviews);
      console.log(`Data Imported`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData = async () => {
    try {
      await Bootcamp.deleteMany();
      await Course.deleteMany();
      await User.deleteMany();
      await Review.deleteMany();
      console.log(`Data Destroyed`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

  if (process.argv[2] === "-i") {
    importData();
  } else if (process.argv[2] === "-d") {
    deleteData();
  }
};

seedData();
