const router = require("express").Router();
const models = require("../../../models/models");
const productOrders = models.order;
const userServices = models.users;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const emailService = require("../../../utilities/email");
const emailTemplate = require("../../../utilities/emailTemplate");

// post order by user

router.post("/productOrder", async (req, res) => {
  try {
    let newOrder = new productOrders(req.body);
    const order = await newOrder.save();
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: order,
    });

    const userInfo = await userServices.findOne({
      userName: req.body.userName,
    });
    const user = { ...order._doc, ...userInfo._doc };
    let mailContent = emailTemplate.emailObjectCreation(
      user,
      "creates An Order"
    );
    emailService.sendEmail(mailContent);
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "order can't be posted",
      exception: exception,
    });
  }
});

// view orders by username

router.get("/viewOrder", async (req, res) => {
  try {
    let getOrder = req.query.userName;
    getOrder = await productOrders.find({ userName: req.query.userName });
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: getOrder,
      count: getOrder.length,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: "order can't viewed",
      exception: exception,
    });
  }
});

// update(cancel) order by userName

router.put("/cancelOrder", async (req, res) => {
  try {
    const cancelOrder = await productOrders.find({
      orderId: req.body.orderId,
    });

    const updateCancelOrder = cancelOrder[0];

    updateCancelOrder.isCanceled = true;

    let result = await productOrders.findOneAndUpdate(
      { orderId: req.body.orderId },
      updateCancelOrder,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );

    res.status(200).json({
      status: httpStatus.OK,
      message: "request successfull",
      data: updateCancelOrder,
    });

    //notification code

    const userInfo = await userServices.findOne({
      userName: updateCancelOrder.userName,
    });
    const user = { ...userInfo._doc, ...updateCancelOrder._doc };
    console.log("--------------------------", user);
    let mailContent = emailTemplate.emailObjectCreation(
      user,
      "cancel Order by User"
    );
    emailService.sendEmail(mailContent);
  } catch (exception) {
    console.log(exception),
      res.status(500).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: constants.FAILURE_MSG,
        data: "order can't canceled",
        exception: exception,
      });
  }
});

module.exports = router;
