const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema({
  userId: {
    type: String,
  },
  verificationCode: String,
  createdAt: Date,
  expiresAt: Date,
});

const ResetPassword = mongoose.model("ResetPassword", ResetPasswordSchema);

module.exports = ResetPassword;
