const express = require("express");
const app = express();
const db = require("./db/db.js");
const userservices = require("./api/users/user/userServices");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const adminservices = require("./api/admin/users/userServices");
const categories = require("./api/admin/category/category");
const productservices = require("./api/admin/products/products");
const userProductServices = require("./api/users/products/products");
const productOrders = require("./api/users/order/order");
const productOrdersAdmin = require("./api/admin/orders/orders");
const couponCode = require("./api/admin/coupon/codeGeneration");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send({
    status: "ON",
    message: "Services are up an running!!",
  });
});

app.use("/api/userServices", userservices);
app.use("/api/adminServices", adminservices);
app.use("/api/category", categories);
app.use("/api/products/", productservices);
app.use("/api/products/", userProductServices);
app.use("/api/orders", productOrders);
app.use("/api/orders", productOrdersAdmin);
app.use("/api/coupon", couponCode);
app.listen(process.env.PORT || 3000, () => {
  console.log("server is up at 3000");
});
