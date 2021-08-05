require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const mongooseConf = require("./server/config/mongo.conf");
const app = express();
const port = process.env.PORT || 3200;
const userRoutes = require("./server/routes/users.routes");

mongooseConf(mongoose);

app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(port, () => console.log(`It's alive! (on port ${port})`));
