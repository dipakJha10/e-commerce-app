const router = require("express").Router();
const models = require("../../../models/models");
const userServices = models.users;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");
const upload = require("../../../utilities/fileUpload");
const fs = require("fs");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a JSON file!" });
    }
    let path = __basedir + "/uploads/" + req.file.filename;
    fs.readFile(path, handleFile);
    let obj;
    function handleFile(err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      triggerUserFLow(obj);
    }

    res.status(200).json({
      status: httpStatus.OK,
      message: constants.constants.SUCCCESS_MSG,
      data: null,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.constants.FAILURE_MSG,
      exception: exception,
    });
  }
});

let triggerUserFLow = async (bulkdata) => {
  let testData = bulkdata[0];
  console.log(testData);
};



module.exports = router;
