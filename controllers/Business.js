const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const Business = require("../models/Business");

const createBusiness = async (req, res) => {
  try {
    const { coverPhoto, pptPresentation, idCardPhoto, passportPhoto } =
      req.files;
    const {
      businessTitle,
      category,
      location,
      description,
      shortPitch,
      amountNeeded,
      percentProfit,
      expectedReturnTime,
    } = req.body;
    const userId = req.params.userId;

    // Store files in Firebase storage
    const uploadedFiles = await Promise.all([
      uploadFileToFirebase(coverPhoto[0]),
      uploadFileToFirebase(pptPresentation[0]),
      uploadFileToFirebase(idCardPhoto[0]),
      uploadFileToFirebase(passportPhoto[0]),
    ]);

    // Create a new business record in MongoDB with the file URLs
    const business = new Business({
      businessTitle,
      category,
      location,
      description,
      shortPitch,
      amountNeeded,
      percentProfit,
      expectedReturnTime,
      userId,
      coverPhoto: uploadedFiles[0],
      pptPresentation: uploadedFiles[1],
      idCardPhoto: uploadedFiles[2],
      passportPhoto: uploadedFiles[3],
    });

    await business.save();

    res.status(201).json({ message: "Business created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create business" });
  }
};

// Helper function to upload file to Firebase storage
const uploadFileToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const bucket = admin.storage().bucket();

    const uuid = uuidv4(); // Generate a unique filename
    const fileName = `uploads/${uuid}-${file.originalname}`;

    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject(error);
    });

    blobStream.on("finish", () => {
      fileUpload.makePublic().then(() => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve(publicUrl);
      });
    });

    blobStream.end(file.buffer);
  });
};

//get particular business
const getSpecificBusiness = (req, res) => {
  let businessId = req.params.businessId;
  Business.findById(businessId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "An error occured while performing the search",
      });
    });
};
//controller to get all businesses
const getBusinesses = (req, res) => {
  Business.find().then((data) => {
    if (data) {
      return res.json({
        message: "Successfull",
        data: data,
      });
    }
  });
};
module.exports = { createBusiness, getSpecificBusiness, getBusinesses };
