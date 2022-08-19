const multer = require("multer");

const jsonFilter = (req, file, cb) => {
  if (file.mimetype.includes("json")) {
    cb(null, true);
    console.log("hello -------", __basedir);
  } else {
    cb("Please upload only json file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-customerDetails-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: jsonFilter });
module.exports = uploadFile;
