const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dipakjha.16b@gmail.com",
    pass: "quhyqcjoeabohlxl",
  },
});

const sendEmail = (reqObj) => {
  var mailOptions = {
    from: "dipakjha.16b@gmail.com",
    subject: reqObj.subject,
    text: reqObj.text,
    to: reqObj.emailTo,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendEmail,
};
