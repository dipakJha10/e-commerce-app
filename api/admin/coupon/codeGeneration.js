const router = require("express").Router();
const models = require("../../../models/models");
const couponCode = models.coupon;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");

// post api for coupon generation

router.post("/codeGeneration", async (req, res) => {
  try {
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      message: "code has been genrating, wait for few minutes",
    });

    let codesArray = [];

    for (let i = 0; i < req.body.count; i++) {
      let alphaNum = constants.couponCodeGeneration();
      console.log(alphaNum);
      let data = {
        couponCode: alphaNum,
        isActive: true,
        isUsed: false,
        discountPercentage: req.body.disocunt,
      };
      codesArray.push(data);
    }

    let result = await couponCode.insertMany(codesArray);
    console.log(result);
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

module.exports = router;
