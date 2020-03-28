require("kvell-scripts/config");
const fs = require("fs");
const PluginInstance = require("kvell-db-plugin-mongoose/init");
const pluginOptions = require("./kvell-plugins").databasePlugins[0].options;

const seedData = async () => {
  await PluginInstance.createDBInstance(pluginOptions);

  // const mongoose = require("kvell-db-plugin-mongoose").dbInstance;
  const Bootcamp = require("./models/bootcamp");

  const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, `utf-8`)
  );

  const importData = async () => {
    try {
      await Bootcamp.create(bootcamps);
      console.log(`Data Imported`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData = async () => {
    try {
      await Bootcamp.deleteMany();
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
