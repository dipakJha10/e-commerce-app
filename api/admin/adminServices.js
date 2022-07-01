const router = require("express").Router();
const models = require("../../models/models");
const userServices = models.users;
const constants = require("../../utilities/constants");
const httpStatus = require("http-status");

//get api for admin for getting all users informaitons
router.get("/users", async (req, res) => {
  try {
    const allUsers = await userServices.find({});
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: allUsers,
      count: allUsers.length,
    });
    console.log(allUsers);
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
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
      message: constants.SUCCCESS_MSG,
      data: findUser,
    });
  } catch (error) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: null,
    });
  }
});

module.exports = router;
