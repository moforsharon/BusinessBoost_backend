const express = require("express");
const UploadFilesMiddleware = require("../middleware/Uploadfiles");
const BusinessController = require("../controllers/Business");

const router = express.Router();

// Route for creating a business
router.post(
  "/create/:userId",
  UploadFilesMiddleware,
  BusinessController.createBusiness
);
router.get("/business/:businessId", BusinessController.getSpecificBusiness);
router.get("/businesses", BusinessController.getBusinesses);

module.exports = router;
