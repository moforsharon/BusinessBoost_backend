const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    investorId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: "chat" }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
