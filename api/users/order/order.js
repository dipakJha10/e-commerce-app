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
      message: constants.constants.SUCCCESS_MSG,
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
      message: constants.constants.FAILURE_MSG,
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
      message: constants.constants.SUCCCESS_MSG,
      data: getOrder,
      count: getOrder.length,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
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
    updateOrderStatus.isActive = false;

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
      message: constants.constants.SUCCCESS_MSG,
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
        message: constants.constants.FAILURE_MSG,
        data: "order can't canceled",
        exception: exception,
      });
  }
});

// most ordered product

router.get("/orderNumbers", async (req, res) => {
  try {
    const productOrdersObj = await productOrders.find({
      productId: req.body.productId,
    });
    const result = await productOrders
      .find({ productId: req.body.productId })
      .count();
    console.log(result);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      count: result,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: "number of order can't be fetched",
      exception: exception,
    });
  }
});

// top selling products
router.get("/topProducts", async (req, res) => {
  try {
    let limit = 5;
    if (req.query.top) {
      limit = parseInt(req.query.top);
    }
    // const products = await productOrders.find({}).where({});
    const products = await productOrders.aggregate(
      [
        // {
        //   $match: {
        //     productId: { $in: ["BAGS999"] },
        //   },
        // },
        {
          $group: {
            _id: "$productId",
            count: { $sum: 1 },
            totalPrice: { $sum: "$price" },
          },
        },
        {
          $sort: { count: -1 },
        },
        { $limit: limit },
      ],
      function (err, results) {
        // Do something with the results
      }
    );

    console.log(products);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: products,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: "topProducts can't be fetched",
      exception: exception,
    });
  }
});

module.exports = router;
