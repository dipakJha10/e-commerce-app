const router = require("express").Router();
const models = require("../../../models/models");
const httpStatus = require("http-status");
const userWallet = models.wallet;
const constants = require("../../../utilities/constants");
const userServices = models.users;

// wallet creation

router.get("/viewWallet", async (req, res) => {
  try {
    const walletUser = await userWallet.findOne({
      userName: req.body.userName,
    });
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: walletUser,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: "wallet can not be accessed",
    });
  }
});

module.exports = router;
