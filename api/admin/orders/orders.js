const router = require("express").Router();
const models = require("../../../models/models");
const productOrders = models.order;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const { sendEmail } = require("../../../utilities/email");
const userServices = models.users;
const emailService = require("../../../utilities/email");
const emailTemplate = require("../../../utilities/emailTemplate");

//view orders
router.get("/viewOrders", async (req, res) => {
  try {
    let userOrders;
    if (req.query.orderId) {
      userOrders = await productOrders.find({ orderId: req.query.orderId });
    } else {
      if (req.query.userName) {
        userOrders = await productOrders.find({ userName: req.query.userName });
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
          limit = 3;
        }
        userOrders = await productOrders.find({}).skip(offset).limit(limit);
      }
    }
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: userOrders,
      count: userOrders.length,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// cancel order by admin

router.put("/cancelOrderAdmin", async (req, res) => {
  try {
    const adminCancelOrder = await productOrders.find({
      orderId: req.body.orderId,
    });

    const updateOrderStatus = adminCancelOrder[0];

    updateOrderStatus.isCanceled = true;
    updateOrderStatus.isActive = false;

    let result = await productOrders.findOneAndUpdate(
      { orderId: req.body.orderId },
      updateOrderStatus,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );

    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: updateOrderStatus,
    });

    //mail notification code

    const userInfo = await userServices.findOne({
      userName: updateOrderStatus.userName,
    });

    const user = { ...userInfo._doc, ...updateOrderStatus._doc };
    console.log(user, "===========================================");
    let emailContent = emailTemplate.emailObjectCreation(
      user,
      "cancel Order by User by admin"
    );
    emailService.sendEmail(emailContent);
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// delete orders

router.delete("/delOrders", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.query);
    const deleteOrder = await productOrders.findOneAndRemove({
      orderId: req.query.orderId,
    });

    console.log("deleted object here ----------------", deleteOrder);

    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: null,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

module.exports = router;
