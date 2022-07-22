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

// coupen code model

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

const users = mongoose.model("users", userModel);
const products = mongoose.model("products", productsModel);
const category = mongoose.model("category", productCategoryModel);
const order = mongoose.model("order", orderPoductModel);
const coupon = mongoose.model("coupon", couponCodeModel);

module.exports = {
  users,
  products,
  category,
  order,
  coupon,
};
