const app = require("express");
const router = app.Router();
const Investor = require("../controllers/Investor");

//route to register investor
router.post("/register_investor", Investor.registerInvestor);
router.post("/login_investor", Investor.loginInvestor);

module.exports = router;
