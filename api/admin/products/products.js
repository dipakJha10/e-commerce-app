const router = require("express").Router();
const models = require("../../../models/models");
const productServices = models.products;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");

//add products to the stock
router.post("/addProducts", async (req, res) => {
  try {
    let newProducts = new productServices(req.body);
    const product = await newProducts.save();
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: productServices,
    });
  } catch {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "products can not be added",
    });
  }
});

// update products

router.put("/updateProducts", async (req, res) => {
  try {
    const result = await productServices.findOneAndUpdate(
      {
        productId: req.body.productId,
      },
      req.body,
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: "request successfull",
      data: result.value,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "request Failed",
      data: null,
    });
  }
});

// delete products api

router.delete("/delProduct", async (req, res) => {
  try {
    const delProduct = await productServices.findOneAndRemove({
      productId: req.body.productId,
    });
    res.status(200).json({
      status: httpStatus.OK,
      message: "request successfull",
      data: null,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "request Failed",
      data: null,
    });
  }
});





module.exports = router;
