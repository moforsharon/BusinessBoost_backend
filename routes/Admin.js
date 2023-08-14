const express = require("express");

const router = express.Router();

const AdminController = require("../controllers/Admin");

//user verify email route
router.post("/login", AdminController.loginAdmin);
//user verified page route
router.post("/register", AdminController.registerAdmin);

module.exports = router;
