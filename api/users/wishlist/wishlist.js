const router = require("express").Router();
const models = require("../../../models/models");
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const wishlistServices = models.wishlist;

//add product to wishlist

router.post("/wishlistAdd", async (req, res) => {
  try {
    const findUser = await wishlistServices.findOne({
      userName: req.body.userName,
    });
    console.log(req.body.product.productId);
    let index = findUser.productList.findIndex(
      (p) => p.productId === req.body.product.productId
    );
    console.log("index value---", index);
    if (index != -1) {
      return res.status(200).json({
        status: httpStatus.OK,
        message: "product is alreday there in whishlist",
        data: findUser,
      });
    } else {
      console.log(false, "here I am inserting");
      findUser.productList.push(req.body.product);
    }
    let result = await wishlistServices.findOneAndUpdate(
      { userName: req.body.userName },
      findUser,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: findUser,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "Products can't be added to cart",
      exception: exception,
    });
  }
});

// browse all products in wishlist

router.get("/wishlist", async (req, res) => {
  try {
    const wishlist = await wishlistServices.find({
      userName: req.query.userName,
    });
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: wishlist,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "Products can't be added to cart",
      exception: exception,
    });
  }
});

// delete wishlist

router.delete("/delete", async (req, res) => {
  try {
    const wishlist = await wishlistServices.findOne({
      userName: req.body.userName,
    });
    console.log(wishlist);
    let index = wishlist.productList.findIndex(
      (p) => p.productId === req.body.product.productId
    );
    if (index >= 0) {
      wishlist.productList.splice(index, 1);
    }
    let result = await wishlistServices.findOneAndUpdate(
      { userName: req.body.userName },
      wishlist,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: wishlist,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "Products can't be deleted",
      exception: exception,
    });
  }
});

// delete all the products
router.delete("/deleteAll", async (req, res) => {
  try {
    const wishlist = await wishlistServices.findOne({
      userName: req.body.userName,
    });
    wishlist.productList = [];
    let result = await wishlistServices.findOneAndUpdate(
      { userName: req.body.userName },
      wishlist,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: wishlist,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "Products can't be deleted",
      exception: exception,
    });
  }
});

module.exports = router;
