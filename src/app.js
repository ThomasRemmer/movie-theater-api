const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/Users", require("../routers/User"));
app.use("/Shows", require("../routers/Show"));

module.exports = app;
