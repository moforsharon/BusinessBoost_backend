const app = require("express");
const router = app.Router();

//importing Controllers
const BusinessOwnerController = require("../controllers/BusinessOwner");

//Route to create Business Owner
router.post(
  "/register_business_owner",
  BusinessOwnerController.registerBusinessOwner
);
//Route to login a business owner
router.post(
  "/login_business_owner",
  BusinessOwnerController.loginBusinessOwner
);
//route to get all business owners
router.get(
  "/getAll_business_owners",
  BusinessOwnerController.getAllBusinessOwners
);
//route to get a specific business owner
router.get(
  "/:businessOwnerId",
  BusinessOwnerController.getSpecificBusinessOwner
);
//Route to verify  a business owner
router.put(
  "/verify/:businessOwnerId",
  BusinessOwnerController.verifyBusinessOwner
);
//Route to get all verified business owners
router.get(
  "/verified/business_owner",
  BusinessOwnerController.getAllVerifiedBusinessOwners
); //Route to get all unverified business owners
router.get(
  "/unverified/business_owner",
  BusinessOwnerController.getUnverifiedBusinessOwners
);
//route to get all businesses of a business owner
router.get("/businesses/:userId", BusinessOwnerController.getBusinessOfUser);

module.exports = router;
