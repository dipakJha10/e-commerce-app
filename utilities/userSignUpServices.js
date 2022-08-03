const models = require("../models/models");
const cartService = models.cart;
const wishlistMethod = models.wishlist;
const userContact = models.contactDetail;

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

module.exports = {
  createCart,
  addWishlist,
  SaveContactDetails,
};
