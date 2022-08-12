const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },

  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
  },
  mobileNo: {
    type: Number,
    required: true,
  },

  address: {
    type: Array,
  },
  isActive: {
    type: Boolean,
  },
  reasons: {
    type: String,
  },
});

// products schema

const productsModel = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  categoryId: {
    type: String,
    required: true,
  },
  quantityPerUnit: {
    type: Number,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  minimumSellingRetailPrice: {
    type: Number,
    required: true,
  },
  availableSize: {
    type: Array,
    default: [],
  },
  availableColors: {
    type: Array,
    default: [],
  },
  size: {
    type: Array,
    default: [],
  },
  discount: {
    type: Number,
  },
  unitInStock: {
    type: Number,
    required: true,
  },
  productAvailable: {
    type: Boolean,
    required: true,
  },
  currentOrder: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
});

// category model

const productCategoryModel = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

// product order model
const orderPoductModel = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  fulfilled: {
    type: Boolean,
    required: true,
  },
  shipDate: {
    type: String,
    required: true,
  },
  billDate: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
});

// coupon code model

const couponCodeModel = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
  },
  isUsed: {
    type: Boolean,
  },
  discountPercentage: {
    type: Number,
  },
});

// cart products models

const cartModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  cartProduct: [
    {
      productId: String,
      quantity: Number,
      productName: String,
      price: Number,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

// whishlist products models
const wishListModel = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  productList: [
    {
      productId: String,
      productName: String,
      price: Number,
    },
  ],
});

// user info

const userContactModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
});

// reffral code

const referralCodeModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
  },
});

// wallet code
const walletModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  transactions: [
    {
      coins: Number,
      action: String,
      timeStamp: Number,
    },
  ],
  totalBalance: {
    type: Number,
  },
});

const authModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
});

const users = mongoose.model("users", userModel);
const products = mongoose.model("products", productsModel);
const category = mongoose.model("category", productCategoryModel);
const order = mongoose.model("order", orderPoductModel);
const coupon = mongoose.model("coupon", couponCodeModel);
const cart = mongoose.model("cart", cartModel);
const wishlist = mongoose.model("wishlist", wishListModel);
const contactDetail = mongoose.model("contactDetail", userContactModel);
const referralCode = mongoose.model("referralCode", referralCodeModel);
const wallet=mongoose.model("wallet", walletModel)
const auth = mongoose.model("auth", authModel);

module.exports = {
  users,
  products,
  category,
  order,
  coupon,
  cart,
  wishlist,
  contactDetail,
  referralCode,
  wallet
  auth
};
