// user collection shema

const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../collections");

const user = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: USER_COLLECTION,
  }
);

const model = mongoose.model("UserData", user);

module.exports = model;
