// slots collection shema

const mongoose = require("mongoose");
const { SLOT_COLLECTION } = require("../collections");

const slot = new mongoose.Schema(
  {
    name: { type: String },
    booked: { type: Boolean },
    companyName: { type: String },
  },
  {
    collection: SLOT_COLLECTION,
  }
);

const model = mongoose.model("SlotData", slot);

module.exports = model;
