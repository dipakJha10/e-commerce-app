const router = require("express").Router();
const models = require("../../../models/models");
const productOrders = models.order;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");

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
      message: constants.SUCCCESS_MSG,
      data: userOrders,
      count: userOrders.length,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: null,
    });
  }
});

// cancel order by admin

router.put("/cancelOrderAdmin", async (req, res) => {
  try {
    const adminCancelOrder = await productOrders.find({
      userName: req.body.userName,
    });

    const updateOrderStatus = adminCancelOrder[0];

    updateOrderStatus.isActive = false;

    res.status(200).json({
      status: httpStatus.OK,
      message: "request successfull ! order has been canceled",
      data: adminCancelOrder,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
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
      message: "request successfull ! order has been deleted",
      data: null,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: null,
    });
  }
});

module.exports = router;
