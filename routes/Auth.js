const express = require("express");

const router = express.Router();

const EmailVerificationController = require("../controllers/EmailVerificationController");

//user verify email route
router.use(
  "/verify/:userId/:uniqueString",
  EmailVerificationController.verifyEmailUser
);
//user verified page route
router.use("/verified", EmailVerificationController.verifiedUser);

module.exports = router;
