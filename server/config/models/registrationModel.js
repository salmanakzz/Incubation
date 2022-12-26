// company registration collection shema

const mongoose = require("mongoose");
const { REGISTRATION_COLLECTION } = require("../collections");

const registration = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: Number, required: true },
    companyType: { type: String, required: true },
    revenue: { type: Number, required: true },
    desCompany: { type: String, required: true },
    desTeam: { type: String, required: true },
    status: { type: String },
    date: { type: Date },
  },
  {
    collection: REGISTRATION_COLLECTION,
  }
);

const model = mongoose.model("RegisterData", registration);

module.exports = model;
