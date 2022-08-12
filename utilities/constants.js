var randomstring = require("randomstring");

const constants = {
  SUCCCESS_MSG: "Request Successfull..!!",
  FORBIDDEN_MSG: "Not Authorized..!!",
  FAILURE_MSG: "Request Failed..!!",
  AUTHORIZATION_SUCCESS_MESSAGE: "Login successFull..!!",
  PASSWORD_MISMATCH: "Username password does Not macth..!!",
  USER_NOT_EXISTS: "User does not exist..!!",
};

const couponCodeGeneration = () => {
  let code = randomstring.generate({
    length: 6,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  return code;
};

const referralLogics = {
  coinsReferer: 400,
  userWithReferral: 200,
  isValidForSigningUser: true,
};


const authConstants={
  secret_key:"1234567890",
  expires_in:"1h"
}


module.exports = {
  constants,
  couponCodeGeneration,
  referralLogics,
  authConstants
};
