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

router.put("/")

module.exports = router;
