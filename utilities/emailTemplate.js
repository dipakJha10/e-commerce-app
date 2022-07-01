

let emailObjectCreation = (user, notificationType) => {
  let finalObject = {};
  switch (notificationType) {
    case "SignUp Mail":
      finalObject.subject = `Welcome to Deepak Store`;
      finalObject.text = `Hi ${user.firstName} ${user.lastName} 
          You have been registred successfully to deepak Store, PLease 
          Browse through the products and keep shopping.
          Thanks and Regards
          Deepak Jha`;
      finalObject.emailTo = user.emailId;
      break;
    case "User Block Mail":
      finalObject.subject = `Profile  Removed ${user.userName}`;
      finalObject.text = `Hey ${user.firstName} ${user.lastName}
            Your Profile has been removed effictively from ${new Date()},
            To continue using our site please contact admin on the mail
            Thanks 
            DeepaK Store`;
      finalObject.emailTo = user.emailId;

      break;
  }

  return finalObject;
};

module.exports = {
  emailObjectCreation,
};

// let mailObject = {
//   subject: "Welcome to Deepak Store",
//   text: `Hi ${user.firstName} ${user.lastName}
//            You have been registred successfully to deepak Store, PLease
//            Browse through the products and keep shopping.
//            Thanks and Regards
//            Deepak Jha`,
//   emailTo: user.emailId,
// };
