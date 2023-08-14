const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessOwnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: "businessOwner",
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
    businesses: {
      type: Array,
      default: [],
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true },
  { collection: "businessOwner" }
);

const BusinessOwner = mongoose.model("BusinessOwner", businessOwnerSchema);

module.exports = BusinessOwner;
