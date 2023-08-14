// // chatRoutes.js

// const express = require("express");
// const router = express.Router();
// const { handleMessage } = require("../controllers/chatController");
// const socketIO = require("socket.io");

// // Function to set up chat routes
// function setupChatRoutes(server) {
//   const io = socketIO(server);

//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     // Handle incoming messages
//     handleMessage(io, socket);
//   });
// }

// module.exports = {
//   router,
//   setupChatRoutes,
// };
