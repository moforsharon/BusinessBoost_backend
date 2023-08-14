const Investor = require("../models/Investor");
const bcrypt = require("bcrypt");
// const sendVerificationEmail = require("./EmailVerificationController");
//controller to register an investorconst bcrypt = require("bcrypt");

const registerInvestor = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    let investor = new Investor({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      password: hashedPass,
      phoneNumber: req.body.phoneNumber,
    });
    try {
      investor.save().then((result) => {
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
      var error = "An error occoured while registering investor";
      return res.status(500).json({
        message: error,
      });
    }
  });
};

//controller to login an investor
const loginInvestor = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  Investor.findOne({ $or: [{ email: email }] }).then((investor) => {
    if (investor) {
      bcrypt.compare(password, investor.password, function (err, result) {
        if (err) {
          return res.json({
            message: "An Error Occured",
          });
        }
        if (result) {
          return res.json({
            message: "Login Successfull",
            data: investor,
          });
          console.log("Login Successful");
        } else {
          return res.json({
            message: "Invalid Password",
          });
        }
      });
    } else {
      return (
        res.json({
          message: "Email not found | No user found",
        }),
        console.log("No user found")
      );
    }
  });
};

module.exports = {
  registerInvestor,
  loginInvestor,
};
