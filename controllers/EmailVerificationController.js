const Admin = require("../models/Admin");
const BusinessOwner = require("../models/BusinessOwner");
const Investor = require("../models/Investor");
const UserVerification = require("../models/UserVerification");
const nodemailer = require("nodemailer");

const path = require("path");

//unique string
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
//email handler

//env variables
require("dotenv").config();
//nodemailer stuff
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});
//testing the transporter for success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log("success");
  }
});
//send verification email
const sendVerificationEmail = ({ _id, email }, res) => {
  //url to be used in the email
  const currentUrl = "http://localhost:4000/";

  const uniqueString = uuidv4() + _id;

  //mailOptions
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",

    html: `<p>Verify your email address to complete the signup and login into your email account.</p>This Link<p><b>expires in 6hrs </b></p>

    <p>Press <a href=${
      currentUrl + "auth/verify/" + _id + "/" + uniqueString
    }>here</a> to proceed</p>`,
  };
  // hash the uniqueString
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      //set values in the parentVerification collection
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });
      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //email sent and verification record saved
              return res.json({
                status: "PENDING",
                message: "Verification email sent",
              });
            })
            .catch((error) => {
              res.json({
                status: "Failed",
                message: "Verification email failed",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          return res.json({
            status: "Failed",
            message: "Couldn't save verification email data!",
          });
        });
    })
    .catch(() => {
      return res.json({
        status: "Failed",
        message: "An error occured while hashing email data!",
      });
    });
};

//verify email
const verifyEmailUser = async (req, res) => {
  let { userId, uniqueString } = req.params;
  var userModel;
  //since email is unique, we search through all the models to find the email

  if (await BusinessOwner.findOne({ _id: userId })) {
    userModel = BusinessOwner;
  } else if (await Investor.findOne({ _id: userId })) {
    userModel = Investor;
  } else if (await Admin.findOne({ _id: userId })) {
    userModel = Admin;
  }
  console.log(userModel);
  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        console.log("parent record exist");
        // verification record exists so we proceed

        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        //checking for expired unique string
        if (expiresAt < Date.now()) {
          //record has expired, so we delete it
          UserVerification.deleteOne({ userId })
            .then((result) => {
              userModel
                .deleteOne({ _id: userId })
                .then(() => {
                  let message = "Link has expired. Please sign up again";
                  res.redirect(`/auth/verified/error=true&message=${message}`);
                })
                .catch((error) => {
                  console.log(error);
                  let message =
                    "Clearing user with expired unique string failed";
                  res.redirect(`/auth/verified/error=true&message=${message}`);
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "An error occurred while clearing expired user verification record";
              res.redirect(`/auth/verified/error=true&message=${message}`);
            });
        } else {
          //valid record exist, so we validate the user string
          //first compare the unique string to the hashed unique string to make sure that the incoming
          //data is not ultered

          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                //strings match

                userModel
                  .updateOne({ _id: userId }, { isVerified: true })
                  .then(() => {
                    //delete the parentVerification record since it wont be needed again once verified
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "./../views/index.html")
                        );
                      })
                      .catch((error) => {
                        console.log(error);
                        let message =
                          "An error occurred while finalising successful verification";
                        res.redirect(
                          `/auth/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "An error occurred while updating the parent record to show verified";
                    res.redirect(
                      `/auth/verified/error=true&message=${message}`
                    );
                  });
              } else {
                //existing record but incorrect verification details passed

                let message =
                  "Invalid verification details passed. Check your inbox";
                res.redirect(`/auth/verified/error=true&message=${message}`);
              }
            })
            .catch((error) => {
              console.log(error);
              let message =
                "An error occurred while comparing the unique strings";

              res.redirect(`/auth/verified/error=true&message=${message}`);
            });
        }
      } else {
        // parent verification record doesn't exist
        let message =
          "Account record doesn't exist or has been verified already. Please sign up or login";
        res.redirect(`/auth/verified/error=true&message=${message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      let message =
        "An error occurred while checking for existing user verification record";
      res.redirect(`/auth/verified/error=true&message=${message}`);
    });
};

//verified page

const verifiedUser = (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/index.html"));
};
module.exports = {
  sendVerificationEmail,
  verifiedUser,
  verifyEmailUser,
};
