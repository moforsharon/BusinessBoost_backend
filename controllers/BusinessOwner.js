const BusinessOwner = require("../models/BusinessOwner");
const sendVerificationEmail = require("./EmailVerificationController");
const Business = require("../models/Business");
//verification model
//const sendVerificationEmail = require("./EmailVerificationController");
const bcrypt = require("bcrypt");

//Business Owner register controller
const registerBusinessOwner = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    let businessOwner = new BusinessOwner({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      password: hashedPass,
      phoneNumber: req.body.phoneNumber,
    });
    try {
      businessOwner.save().then((result) => {
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
      var error = "An error occoured while registering Admin";
      return res.status(500).json({
        message: error,
      });
    }
  });
};

//controller to login a business owner
const loginBusinessOwner = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  BusinessOwner.findOne({ $or: [{ email: email }] }).then((businessOwner) => {
    if (businessOwner) {
      bcrypt.compare(password, businessOwner.password, function (err, result) {
        if (err) {
          return res.json({
            message: "An Error Occured",
          });
        }
        if (result) {
          return res.json({
            message: "Login Successfull",
            data: businessOwner,
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
          message: "Email not found",
        }),
        console.log("No user found")
      );
    }
  });
};
//controller to update business Owner information
const updateBusinessOwnerInfo = (req, res) => {};
//controller to get all business owners
const getAllBusinessOwners = (req, res) => {
  BusinessOwner.find()
    .then((data) => {
      res.json({
        data: data,
      });
      console.log("Success");
    })
    .catch((error) => {
      if (error) {
        return res.json({
          message: "Failed to get all Business Owners",
        });
        console.log("Failed to get all Business Owners");
      }
    });
};

//get particular business owner
const getSpecificBusinessOwner = (req, res) => {
  let businessOwnerId = req.params.businessOwnerId;
  BusinessOwner.findById(businessOwnerId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED u",
        message: "An error occured while performing the search",
      });
    });
};

//Controller to verify a business owner
const verifyBusinessOwner = (req, res) => {
  let businessOwnerId = req.params.businessOwnerId;
  BusinessOwner.findById(businessOwnerId).then((result) => {
    if (result) {
      console.log("User found");
      BusinessOwner.updateOne(
        { _id: businessOwnerId },
        { isVerified: true }
      ).then((data) => {
        if (data) {
          console.log("Business Owner Successfully verified");
          return res.json({
            message: "Business Owner Successfully verified",
            data: data,
          });
        } else {
          console.log("An Error occured while verifying the business owner");
          return res.json({
            message:
              "An Error occured while verifying the business owner . Please try again",
          });
        }
      });
    } else {
      console.log("User not found");
      return res.json({
        message: "The Specified business owner was not found",
      });
    }
  });
};
//Controller to get all verified Business owners
const getAllVerifiedBusinessOwners = async (req, res) => {
  // const verifiedBusinessOwner = [];
  //   try {
  //   const businessOwners = await BusinessOwner.find();
  //       businessOwners.map((businessOwner) => {
  //     if (businessOwner.isVerified === true) {
  //       verifiedBusinessOwner.push(businessOwner);
  //     }
  //   });

  //   res.status(200).json(verifiedBusinessOwner);
  // }catch (error) {
  //   res.status(500).json(error);
  // }
  BusinessOwner.find({ isVerified: true }).then((result) => {
    if (result) {
      console.log(result);
      return res.status(200).json(result);
    }
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
};

//controller to get all unverified Business Owners
const getUnverifiedBusinessOwners = (req, res) => {
  BusinessOwner.find({ isVerified: false }).then((result) => {
    if (result) {
      console.log(result);
      return res.json(result);
    }
    if (err) {
      console.log(err);
      return res.send(err);
    }
  });
};

//controller to get businesses of a particular owner
const getBusinessOfUser = (req, res) => {
  const userId = req.params.userId;
  Business.find({ userId }).then((data) => {
    if (data) {
      return res.json(data);
    }
    if (err) {
      return res.send(err);
    }
  });
};

module.exports = {
  registerBusinessOwner,
  loginBusinessOwner,
  getAllBusinessOwners,
  getSpecificBusinessOwner,
  verifyBusinessOwner,
  getAllVerifiedBusinessOwners,
  getUnverifiedBusinessOwners,
  getBusinessOfUser,
};
