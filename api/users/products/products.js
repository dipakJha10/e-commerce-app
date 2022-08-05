const router = require("express").Router();
const models = require("../../../models/models");
const userProductServices = models.products;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");

const { response } = require("express");  
//browse products
router.get("/browseProducts", async (req, res, next) => {
  try {
    let result;
    if (req.query.productId) {
      result = await userProductServices.find({
        productId: req.query.productId,
      });
    } else {
      let offset;
      let limit;
      if (req.query.pageNo && req.query.perPage) {
        req.query.perPage = parseInt(req.query.perPage);
        req.query.pageNo = parseInt(req.query.pageNo);
        offset = req.query.perPage * (req.query.pageNo - 1);
        limit = req.query.perPage;
      } else {
        offset = 0;
        limit = 2;
      }
      result = await userProductServices.find({}).skip(offset).limit(limit);
    }
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: result,
      count: result.length,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "products can not be accessed",
    });
  }
});

module.exports = router;
