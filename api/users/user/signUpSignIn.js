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
const authService = require("../../../utilities/authServices");

//post api for posting user info in database
router.post("/signUp", async (req, res) => {
  try {
    req.body.isActive = true;
    let newUser = new userServices(req.body);
    const user = await newUser.save();

    //user AUTH logic starts==========================================
    let password = await bcrypt.hash(req.body.password, 10);
    let newAuthuser = {
      userName: req.body.userName,
      password: password,
    };
    newAuthuser = new authDbServices(newAuthuser);
    const authUser = await newAuthuser.save();
    console.log(".........", authUser);
    let token = await authService.signIn({ username: req.body.userName });

    //user AUTH logic ends==========================================
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: user,
      token: token,
    });
    let mailObject = emailTemplate.emailObjectCreation(user, "SignUp Mail");
    emailService.sendEmail(mailObject);

    const addCart = await cart.createCart(req.body.userName);
    const productWishlist = await cart.addWishlist(req.body.userName);
    const contactList = await cart.SaveContactDetails(req.body);
    if (req.body.referenceCode) {
      await cart.walletLogic(req.body.referenceCode, req.body.userName);
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

// signIn user

router.post("/signIn", async (req, res) => {
  try {
    const user = await authDbServices.findOne({
      userName: req.body.userName,
    });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = await authService.signIn({ userName: req.body.userName });
        let data = {
          userName: req.body.userName,
          token: token,
        };
        res.status(200).json({
          status: httpStatus.OK,
          message: constants.constants.AUTHORIZATION_SUCCESS_MESSAGE,
          data: data,
        });
      } else {
        res.status(200).json({
          status: httpStatus.OK,
          message: constants.constants.PASSWORD_MISMATCH,
          data: null,
        });
      }
    } else {
      res.status(200).json({
        status: httpStatus.OK,
        message: constants.constants.USER_NOT_EXISTS,
        data: null,
      });
    }
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      exception: exception,
    });
  }
});

module.exports = router;
