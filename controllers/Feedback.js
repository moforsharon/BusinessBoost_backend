const Feedback = require("../models/Feedback");

//controller to create feedback of a particular business
const newFeedback = async (req, res) => {
  try {
    const { title, details } = req.body;
    const businessId = req.params.businessId;

    const feedback = new Feedback({
      businessId,
      title,
      details,
    });
    await feedback.save();
    res.status(201).json({ message: "Feedback added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add feedback pls try agaain" });
  }
};

//controller to get all feedback of a busibness
const getBusinessFeedback = (req, res) => {
  const businessId = req.params.businessId;
  Feedback.find({ businessId }).then((data) => {
    if (data) {
      return res.json(data);
    }
    if (err) {
      return res.send(err);
    }
  });
};
module.exports = {
  newFeedback,
  getBusinessFeedback,
};
