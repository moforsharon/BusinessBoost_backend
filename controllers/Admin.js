const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
// const sendVerificationEmail = require("./EmailVerificationController");
//controller to register an investorconst bcrypt = require("bcrypt");

const registerAdmin = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    let admin = new Admin({
      username: req.body.username,
      password: hashedPass,
    });
    try {
      admin.save().then((result) => {
        //handle account verification
        // sendVerificationEmail.sendVerificationEmail(result, res);
        if (result) {
          return res.json({
            message: "Successfully registered",
            data: result,
          });
        }
      });
    } catch (error) {
      var error = "An error occoured while registering admin";
      return res.status(500).json({
        message: error,
      });
    }
  });
};

//controller to login an investor
const loginAdmin = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  Admin.findOne({ $or: [{ username: username }] }).then((admin) => {
    if (admin) {
      bcrypt.compare(password, admin.password, function (err, result) {
        if (err) {
          return res.json({
            message: "An Error Occured",
          });
        }
        if (result) {
          return res.json({
            message: "Login Successfull",
            data: admin,
          });
        } else {
          return res.json({
            message: "Invalid Password",
          });
        }
      });
    } else {
      return (
        res.json({
          message: "No user found",
        }),
        console.log("No user found")
      );
    }
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
