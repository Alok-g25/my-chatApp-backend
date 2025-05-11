const express =require("express");
const protectRoute = require("../middleware/authMidleware");
const { getUserMessages, createMessage } = require("../controller/messageController");
const { uploadImage } = require("../middleware/uploadFile");

const messageRoute=express.Router();


messageRoute.get("/all/:id",protectRoute,getUserMessages)
messageRoute.post('/create/:id',protectRoute,uploadImage('uploads/messageFiles', 'messageFile'), createMessage);



module.exports=messageRoute