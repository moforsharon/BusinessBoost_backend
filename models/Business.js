const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    businessTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverPhoto: {
      type: String,
      required: true,
    },
    shortPitch: {
      type: String,
      required: true,
    },
    amountNeeded: {
      type: Number,
      required: true,
    },
    pptPresentation: {
      type: String,
      required: true,
    },
    idCardPhoto: {
      type: String,
      required: true,
    },
    passportPhoto: {
      type: String,
      required: true,
    },
    percentProfit: {
      type: Number,
      required: true,
    },
    expectedReturnTime: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isTaken: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { collection: "businesses" }
);
const Businesses = mongoose.model("Businesses", businessSchema);
module.exports = Businesses;