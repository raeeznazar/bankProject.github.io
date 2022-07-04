// defining things which have direct connect with database
//database connectio

//import mongoose

const mongoose = require("mongoose");

//connection string to connect db with server

mongoose.connect("mongodb://localhost:27017/BankServer", {
  useNewUrlParser: true,
});

// Create a model inorder to perform operation between server and mongodb
const User = mongoose.model("User", {
  acno: Number,
  uname: String,
  password: String,
  balance: Number,
  transaction: [],
});

module.exports = {
  User,
};
