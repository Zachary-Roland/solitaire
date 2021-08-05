require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3200;
const userRoutes = require("./server/routes/users.routes");

app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(port, () => console.log(`It's alive! (on port ${port})`));
