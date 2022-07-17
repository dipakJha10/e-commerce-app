const router = require("express").Router();
const models = require("../../../models/models");
const userProductServices = models.products;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const redis = require("redis");
const { response } = require("express");

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);
client.connect();
//browse products
router.get("/browseProducts", async (req, res, next) => {
  try {
    let result;
    if (req.query.productId) {
      result = await userProductServices.find({
        productId: req.query.productId,
      });
    } else {
      let redisRespone = await client.get("products");
      if (redisRespone !== null) {
        console.log("response from resis is  coming==========================");
        result = JSON.parse(redisRespone);
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
        client.set("products", JSON.stringify(result));
        console.log("saving response to resis ==========================");
      }
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
