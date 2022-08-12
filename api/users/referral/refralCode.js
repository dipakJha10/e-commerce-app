const router = require("express").Router();
const models = require("../../../models/models");
const httpStatus = require("http-status");
const referral = models.referralCode;
const constants = require("../../../utilities/constants");
const userServices = models.users;
const crypto = require("crypto");

// referral code

router.get("/referral", async (req, res) => {
  try {
    const code = await referral.findOne({ userName: req.body.userName });
    if (!code) {
      const user = await userServices.findOne({ userName: req.body.userName });
      const fName = user.firstName.slice(0, 2);
      const lName = user.lastName.slice(0, 2);
      const n = crypto.randomInt(0, 1000000);
      const codes = fName + lName + n;
      const referralCodes = codes.toUpperCase();
      const userReferal = {
        userName: user.userName,
        referralCode: referralCodes,
      };
      const newCode = new referral(userReferal);
      const userCode = await newCode.save();
      res.status(200).json({
        status: httpStatus.OK,
        message: constants.constants.SUCCCESS_MSG,
        data: userCode,
      });
    } else {
      res.status(200).json({
        status: httpStatus.OK,
        message:  constants.constants.SUCCCESS_MSG,
        data: code,
      });
      console.log(code);
    }
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
