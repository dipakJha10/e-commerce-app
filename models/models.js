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

const users = mongoose.model("users", userModel);

module.exports = {
  users,
};
