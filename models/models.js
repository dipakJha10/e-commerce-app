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
  venderId: {
    type: String,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
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
    unique:true,
  },
  categoryName: {
    type: String,
    required:true,
  },
  categoryDescription: {
    type: String,
  },
  active: {
    type:Boolean,
  }
})


const users = mongoose.model("users", userModel);
const products = mongoose.model("products", productsModel);
const category = mongoose.model("category", productCategoryModel);
module.exports = {
  users, products,category
};
