const router = require("express").Router();
const models = require("../../../models/models");
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const cartService = models.cart;

// post api for adding product to cart

router.post("/addCart", async (req, res) => {
  try {
    const addToCart = await cartService.findOneAndUpdate(
      { userName: req.body.userName },
      req.body,
      {
        upsert: true,
        new: true,
        rawData: true,
      }
    );
    console.log(addToCart);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: addToCart,
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

//// get api for view product in cart

router.get("/viewCart", async (req, res) => {
  try {
    const viewCart = await cartService.find({ userName: req.query.userName });
    console.log(viewCart);

    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: viewCart,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: "topProducts can't be fetched",
      exception: exception,
    });
  }
});

//  add products to cart (post api)

router.post("/addProductToCart", async (req, res) => {
  try {
    // getting the cart by user name-----------------------------
    const cart = await cartService.findOne({ userName: req.body.userName });
    //cart is present for particular user, cart products are there or not
    console.log("before update", cart);
    if (cart && cart.cartProduct.length && cart.cartProduct.length > 0) {
      // check whether the cart contains the requested product already

      //if yes incraese qunatity by 1
      let index = cart.cartProduct.findIndex(
        (product) => product.productId === req.body.product.productId
      );
      if (index != -1) {
        //logic if matching product id preseent
        cart.cartProduct[index].quantity = cart.cartProduct[index].quantity + 1;
      } else {
        req.body.product.quantity = 1;
        cart.cartProduct.push(req.body.product);
      }
    } else {
      req.body.product.quantity = 1;
      cart.cartProduct.push(req.body.product);
    }

    let result = await cartService.findOneAndUpdate(
      { userName: req.body.userName },
      cart,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
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

// update product from cart

router.put("/updateCart", async (req, res) => {
  try {
    const findUser = await cartService.findOne({ userName: req.body.userName });
    if (findUser.cartProduct.length > 0) {
      let index = findUser.cartProduct.findIndex(
        (product) => product.productId === req.body.productId
      );
      if (index >= 0) {
        if (req.body.action === "dec") {
          if (findUser.cartProduct[index].quantity === 1) {
            findUser.cartProduct.splice(index, 1);
          } else {
            findUser.cartProduct[index].quantity =
              findUser.cartProduct[index].quantity - 1;
          }
        } else {
          findUser.cartProduct[index].quantity =
            findUser.cartProduct[index].quantity + 1;
        }
      }
    }
    console.log("after operations", findUser);
    let result = await cartService.findOneAndUpdate(
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
      data: "",
      exception: exception,
    });
  }
});

// delete product from cart
router.delete("/delete", async (req, res) => {
  try {
    const user = await cartService.findOne({ userName: req.body.userName });
    
      let index = user.cartProduct.findIndex(
        (product) => product.productId === req.body.productId
      );
      if (index >= 0) {
        user.cartProduct.splice(index, 1);
      }
    

    // let result = await cartService.findOneAndUpdate(
    //   { userName: req.body.userName },
    //   user,
    //   {
    //     new: true,
    //     upsert: true,
    //     rawResult: true, // Return the raw result from the MongoDB driver
    //   }
    // );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: user,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "",
      exception: exception,
    });
  }
});

// delete products

router.delete("/deleteCart", async (req, res) => {
  try {
    const user = await cartService.findOne({ userName: req.body.userName });
    let product = req.body.productId;   
    if (product) {
      user.cartProduct.splice(product,1);
    }
    let result = await cartService.findOneAndUpdate(
      { userName: req.body.userName },
      user,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: user,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "",
      exception: exception,
    });
  }
});

module.exports = router;
