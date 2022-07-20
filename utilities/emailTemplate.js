// mail notification on creating new user and blocking new user
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
    case "creates An Order":
      finalObject.subject = `Your order has been Placed`;
      finalObject.text = `Hi ${user.firstName} ${user.lastName} 
        Your order has been apporved and saved.Your order has been shipped on your address
        Thanks and Regards
        Deepak Jha`;
      finalObject.emailTo = user.emailId;
      break;
    case "cancel Order by User":
      finalObject.subject = `Confirmation of order Canceled by User `;
      finalObject.text = `Hi ${user.firstName} ${user.lastName} 
        This mail is regarding order cancelation by you. We noticed that have canceled your
        order. and it is apporoved. Stay in touch with us and visit our website for the new stocks
        available.
        Thanks and Regards
        Deepak Jha`;
      finalObject.emailTo = user.emailId;
      break;
    case "cancel Order by User by admin":
      finalObject.subject = `Confirmation of order Canceled by Admin `;
      finalObject.text = `Hi ${user.firstName} ${user.lastName} 
        This mail is regarding order cancelation.As per your request your order has been canceled.Stay in touch with us and visit our website for the new stocks
        available.
        Thanks and Regards
        Deepak Jha `;
      finalObject.emailTo = user.emailId;
      break;
  }

  return finalObject;
};

module.exports = {
  emailObjectCreation,
};
