var express = require("express");
require("dotenv").config();
var app = express();
const router = express.Router();

const bcrypt = require("bcrypt");
// importing some middleware
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");
const socketIO = require("socket.io");
// const setupChat = require("./controllers/c");

const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//   },
// });
// setupChat(io);

//initializing firebase
const admin = require("firebase-admin");

const serviceAccount = require("./businessboost-98e2e-firebase-adminsdk-yh5nu-99f9644d85.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "businessboost-98e2e.appspot.com", // Replace with your Firebase storage bucket name
});

// database connection
const connection = require("./mongoConnect");
connection();
/*******************
 *****  middleware  **
 *********************/
app.use(express.json()); //just as body parser
app.use(helmet()); //help securing the request send
app.use(cors()); //for cross platform request
app.use(morgan("common")); //send in the console the detail about the request you did
//importing the routes
const BusinessOwnerRoutes = require("./routes/BusinessOwner");
const AuthRoutes = require("./routes/Auth");
const BusinessRoutes = require("./routes/Business");
const InvestorRoutes = require("./routes/Investor");
const FeedbackRoutes = require("./routes/Feedback");
const AdminRoutes = require("./routes/Admin");

/********************************/
/** calling/using  our routes ***/
/********************************/
app.use("/business_owner", BusinessOwnerRoutes);
app.use("/auth", AuthRoutes);
app.use("/business", BusinessRoutes);
app.use("/investor", InvestorRoutes);
app.use("/feedback", FeedbackRoutes);
app.use("/admin", AdminRoutes);

//express listening
server.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`Server successfully started  on port ${process.env.PORT}`);
    bcrypt.hash("nehdalisa", 10).then((result) => {
      console.log(result);
    });
  } else {
    console.log("And error occurred");
  }
});

module.exports = app;
