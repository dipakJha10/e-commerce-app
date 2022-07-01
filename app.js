const express = require("express");
const app = express();
const db = require("./db/db.js");
const userservices = require("./api/users/userServices");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const adminservices = require("./api/admin/adminServices");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("hi there");
});

app.use("/api/userServices", userservices);
app.use("/api/adminServices", adminservices);

app.listen(3000, () => {
  console.log("server is up at 3000");
});
