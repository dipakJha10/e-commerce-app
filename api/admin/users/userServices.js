const router = require("express").Router();
const models = require("../../../models/models");
const userServices = models.users;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const emailService = require("../../../utilities/email");
const emailTemplate = require("../../../utilities/emailTemplate");

//get api for admin for getting all users informaitons
router.get("/users", async (req, res) => {
  try {
    const allUsers = await userServices.find({});
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: allUsers,
      count: allUsers.length,
    });
    console.log(allUsers);
  } catch (exception) {
    console.log(exception);
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
    const findUser = await userServices.findOne({
      firstName: req.query.firstName,
    });

    console.log(findUser);
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: findUser,
    });
  } catch (error) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// deactivate user api
router.put("/removeUser", async (req, res) => {
  try {
    const removeUser = await userServices.find({ userName: req.body.userName });

    const updateUserObj = removeUser[0];

    updateUserObj.isActive = false;

    let result = await userServices.findOneAndUpdate(
      { userName: req.body.userName },
      updateUserObj,
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
    let mailObject = emailTemplate.emailObjectCreation(
      updateUserObj,
      "User Block Mail"
    );
    emailService.sendEmail(mailObject);
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message:constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

module.exports = router;
