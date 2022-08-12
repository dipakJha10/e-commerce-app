const express = require("express");
const app = express();
const db = require("./db/db.js");
const userservices = require("./api/users/user/userServices");
const userSignUp = require("./api/users/user/signUpSignIn");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const adminservices = require("./api/admin/users/userServices");
const categories = require("./api/admin/category/category");
const productservices = require("./api/admin/products/products");
const userProductServices = require("./api/users/products/products");
const productOrders = require("./api/users/order/order");
const productOrdersAdmin = require("./api/admin/orders/orders");
const couponCode = require("./api/admin/coupon/codeGeneration");
const userCoupon = require("./api/users/coupons/coupon");
const cart = require("./api/users/cart/cart");
const productWishlist = require("./api/users/wishlist/wishlist");
const referral = require("./api/users/referral/refralCode");
const wallet = require("./api/users/wallet/wallet");
const authService = require("./utilities/authServices");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send({
    status: "ON",
    message: "Services are up an running!!",
  });
});

app.use("/api/userSignUpSignIn", userSignUp);
//added middleware auth
app.use(authService.verifyToken, function (req, res, next) {
  authService.tokenValidation(req, res, next);
});
app.use("/api/adminServices", adminservices);
app.use("/api/userServices", userservices);
app.use("/api/category", categories);
app.use("/api/products/", productservices);
app.use("/api/products/", userProductServices);
app.use("/api/orders", productOrders);
app.use("/api/orders", productOrdersAdmin);
app.use("/api/coupon", couponCode);
app.use("/api/coupons", userCoupon);
app.use("/api/cart", cart);
app.use("/api/wishlist", productWishlist);
app.use("/api/referral", referral);
app.use("/api/wallet", wallet);
app.listen(process.env.PORT || 3000, () => {
  console.log("server is up at 3000");
});
