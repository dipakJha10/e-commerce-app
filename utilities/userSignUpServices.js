const models = require("../models/models");
const cartService = models.cart;
const wishlistMethod = models.wishlist;
const userContact = models.contactDetail;
const constants = require("../utilities/constants");
const walletService = models.wallet;
const referralService = models.referralCode;

//for cart
let createCart = async (userName) => {
  let cart = {
    userName: userName,
    cartProduct: [],
  };
  let cartAdd = new cartService(cart);
  let result = await cartAdd.save();
  return result;
};

// for wishlist

let addWishlist = async (userName) => {
  let userWishlist = {
    userName: userName,
    productList: [],
  };
  let wishlistAdd = new wishlistMethod(userWishlist);
  let result = await wishlistAdd.save();
  return result;
};

// user contact saved

let SaveContactDetails = async (obj) => {
  let contactDetail = {
    userName: obj.userName,
    emailId: obj.emailId,
    mobileNo: obj.mobileNo,
  };
  let contactAdd = new userContact(contactDetail);
  let result = await contactAdd.save();
  return result;
};

// wallet logic //

let walletLogic = async (referralCode, userName) => {
  //get refrral data by username----needed username to prceed for the flow
  const refrralMaster = await referralService.findOne({
    referralCode: referralCode,
  });

  //getting wallet od referrer using username
  const walletMaster = await walletService.findOne({
    userName: refrralMaster.userName,
  });

  //if wallet is there then update the wallet object
  if (walletMaster) {
    let transaction = {
      coins: constants.referralLogics.coinsReferer,
      action:
        "coins added due to user signup with username" +
        userName +
        "and with reference code" +
        referralCode,
      timeStamp: Date.now(),
    };
    walletMaster.transactions.push(transaction);
    walletMaster.totalBalance =
      walletMaster.totalBalance + constants.referralLogics.coinsReferer;
    //update already existing walllet

    let result = await walletService.findOneAndUpdate(
      { userName: refrralMaster.userName },
      walletMaster,
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );
    console.log("wallet logic added", result);
  } else {
    let masterObject = {
      userName: refrralMaster.userName,
      transactions: [
        {
          coins: constants.referralLogics.coinsReferer,
          action: `coins added due to user signup with username" ${userName}`,
          timeStamp: Date.now(),
        },
      ],
      totalBalance: constants.referralLogics.coinsReferer,
    };
    let referralWallet = new walletService(masterObject);
    let result = await referralWallet.save();
    console.log(result, "done adding to wallet...............");
    //new insert logic
  }

  if (constants.referralLogics.isValidForSigningUser) {
    let masterObject = {
      userName: userName,
      transactions: [
        {
          coins: constants.referralLogics.userWithReferral,
          action: `coins added due to user signup with username" ${userName}`,
          timeStamp: Date.now(),
        },
      ],
      totalBalance: constants.referralLogics.userWithReferral,
    };
    let referralWallet = new walletService(masterObject);
    let result = await referralWallet.save();
    console.log(result, "done adding to wallet...............");
    //new insert logic
  }
};

module.exports = {
  createCart,
  addWishlist,
  SaveContactDetails,
  walletLogic,
};
