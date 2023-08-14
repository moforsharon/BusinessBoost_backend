const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    businessId: {
      required: true,
      type: String,
    },
    title: {
      required: false,
      type: String,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "feedback" }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;