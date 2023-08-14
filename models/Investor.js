const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "investor",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    amountInvested: {
      type: Number,
      default: 0,
    },
    expectedProfit: {
      type: Number,
      default: 0,
    },
    hasInvested: {
      type: Boolean,
      default: false,
    },
    investments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
  { collection: "investor" }
);

const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;