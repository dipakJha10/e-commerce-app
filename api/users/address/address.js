const router = require("express").Router();
const models = require("../../../models/models");
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const axios = require("axios");
const userServices = models.users;

router.post("/postAddress", async (req, res) => {
  try {
    let addressData = await getPInData(req.body.pin);

    let newAddress = {
      name: req.body.name,
      addressId: camelCase(req.body.name),
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      landMark: req.body.landMark,
      pin: req.body.pin,
      state: addressData.state,
      district: addressData.district,
      country: addressData.country,
      contactNumber: req.body.contactNumber,
      addressType: req.body.addressType,
      default: false,
    };
    const user = await userServices.findOne({ userName: req.body.userName });
    user.address.push(newAddress);
    let result = await userServices.findOneAndUpdate(
      { userName: req.body.userName },
      user,
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

let getPInData = async (pincode) => {
  const URL = "https://api.postalpincode.in/pincode/" + pincode;
  const res = await axios.get(URL);

  const data = res.data[0];
  let infoMaster = {
    district: data.PostOffice[0].District,
    country: data.PostOffice[0].Country,
    state: data.PostOffice[0].State,
  };

  return infoMaster;
};

const camelCase = (string) => {
  function camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }
  const newText = camelize(string);
  return newText;
};

//view addresses
router.get("/viewAddress", async (req, res) => {
  try {
    const user = await userServices.findOne({
      userName: req.body.userName,
    });
    const addresses = user.address;
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: addresses,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// delete address
router.delete("/delete", async (req, res) => {
  try {
    const user = await userServices.findOne({
      userName: req.body.userName,
    });
    const userAddress = user.address.findIndex(
      (a) => a.addressId === req.body.addressId
    );
    const deleteAddress = user.address.splice(userAddress, 1);
    let result = await userServices.findOneAndUpdate(
      { userName: req.body.userName },
      user,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      data: null,
    });
  }
});

// update address status
router.put("/update", async (req, res) => {
  try {
    const user = await userServices.findOne({
      userName: req.body.userName,
    });

    for (let address of user.address) {
      if (address.addressId === req.body.addressId) {
        address.default = true;
      } else {
        address.default = false;
      }
    }

    let result = await userServices.findOneAndUpdate(
      { userName: req.body.userName },
      user,
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
    });
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
