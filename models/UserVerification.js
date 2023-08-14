const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema(
  {
    userId: {
      type: String,
    },
    uniqueString: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },

  { timestamps: true }
);
const UserVerification = mongoose.model(
  "userVerification",
  userVerificationSchema
);
module.exports = UserVerification;
