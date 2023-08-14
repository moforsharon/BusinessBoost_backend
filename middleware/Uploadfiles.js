// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Set the destination folder for temporary file storage
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Middleware for handling file uploads
const uploadFiles = upload.fields([
  { name: "coverPhoto", maxCount: 1 },
  { name: "pptPresentation", maxCount: 1 },
  { name: "idCardPhoto", maxCount: 1 },
  { name: "passportPhoto", maxCount: 1 },
]);

module.exports = uploadFiles;
