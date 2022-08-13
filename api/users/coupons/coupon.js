const router = require("express").Router();
const models = require("../../../models/models");
const couponCodes = models.coupon;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");

// post Api for user coupon
router.post("/verifyCode", async (req, res) => {
  try {
    const findCode = await couponCodes.findOne({
      couponCode: req.body.couponCode,
      isActive: true,
      isUsed: false,
    });
    if (!findCode) {
      res
        .status(400)
        .send({ message: "Code is not valid or has been used already" });
    }
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      discountPercentage: findCode.discountPercentage,
      isUsed: findCode.isUsed,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

/// apply coupon codes

router.put("/couponApply", async (req, res) => {
  try {
    const appliedCode = await couponCodes.find({
      couponCode: req.query.couponCode,
    });
    const codeUsedObj = appliedCode[0];
    codeUsedObj.isActive = false;
    codeUsedObj.isUsed = true;
    let result = await couponCodes.findOneAndUpdate(
      { couponCode: codeUsedObj.couponCode },
      codeUsedObj,
      {
        upsert: true,
        new: true,
        rawData: true,
      }
    );
    console.log(result);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: result.value,
    });
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
