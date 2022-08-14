const router = require("express").Router();
const models = require("../../../models/models");
const userServices = models.users;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const emailService = require("../../../utilities/email");
const emailTemplate = require("../../../utilities/emailTemplate");
const cart = require("../../../utilities/userSignUpServices");
const authDbServices = models.auth;
const bcrypt = require("bcrypt");
const authService = require('../../../utilities/authServices')

//get api for user getting its profile info
router.get("/users", async (req, res) => {
  try {
    const user = await userServices.find({ userName: req.query.userName });
    if (user[0].isActive === false) {
      const udateUserObj = user[0];

      udateUserObj.reasons = " ";
      udateUserObj.isActive = true;

      let result = await userServices.findOneAndUpdate(
        { userName: user[0].userName },
        udateUserObj,
        {
          new: true,
          upsert: true,
          rawResult: true, // Return the raw result from the MongoDB driver
        }
      );
    }

    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: user[0],
    });
  } catch (error) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

//update api

router.put("/users", async (req, res) => {
  try {
    let result = await userServices.findOneAndUpdate(
      { userName: req.body.userName },
      req.body,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: result.value,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// api for user deactivate
router.put("/deActivate", async (req, res) => {
  try {
    const user = await userServices.find({ userName: req.body.userName });

    const udateUserObj = user[0];

    udateUserObj.reasons = req.body.reason;
    udateUserObj.isActive = false;

    let result = await userServices.findOneAndUpdate(
      { userName: req.body.userName },
      udateUserObj,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: result.value,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// user search api
router.get("/userSearch", async (req, res) => {
  try {
    const user = await userServices.find({
      $or: [
        { firstName: { $regex: ".*" + req.query.keyword + ".*" } },
        { lastName: { $regex: ".*" + req.query.keyword + ".*" } },
      ],
    });
    console.log(user);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

module.exports = router;
