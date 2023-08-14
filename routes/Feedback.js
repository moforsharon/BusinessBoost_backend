const express = require("express");
const router = express.Router();
const Feedback = require("../controllers/Feedback");

//route to add feedback
router.post("/new/:businessId", Feedback.newFeedback);
//router to get all feedback of a particular business
router.get("/business/:businessId", Feedback.getBusinessFeedback);

module.exports = router;
