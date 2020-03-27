module.exports = {
  databasePlugins: [
    {
      resolve: "kvell-db-plugin-mongoose",
      options: {
        mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
        options: {}
        // showConnectionMessage: true
      }
    }
  ]
};
