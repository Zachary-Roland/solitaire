const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

export default (mongoose) => {
  function gracefulExit() {
    db.close(() => {
      console.log(
        "Mongoose connection has disconnected through app termination"
      );
      process.exit(0);
    });
  }
  db.on("connected", (ref) => {
    console.log(
      `Successfully connected to ${process.env.NODE_ENV} database on startup`
    );
  });
  db.on("error", (err) => {
    console.error(
      `Failed to connect to ${process.env.NODE_ENV} database on startup`,
      err
    );
  });
  db.on("disconnected", () => {
    console.log(
      `Mongoose default connection to ${process.env.NODE_ENV} database disconnected`
    );
  });
  process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
  mongoose.connect(mongoDB, { useMongoClient: true }, (error) => {
    if (error) throw error;
  });
};
