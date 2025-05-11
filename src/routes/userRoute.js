const express =require("express");
const { signup, login, logout, checkAuth, getAllUsers, profileUpdate } = require("../controller/userController");
const upload = require("../middleware/upload");
const protectRoute = require("../middleware/authMidleware");
const { uploadImage } = require("../middleware/uploadFile");

const userRoute=express.Router();

userRoute.post("/signup",upload.none(),signup)
userRoute.post("/login",upload.none(),login)
userRoute.get("/logout",protectRoute,logout)
userRoute.get("/check",protectRoute,checkAuth)
userRoute.get("/all",protectRoute,getAllUsers)
userRoute.put('/update-profile',protectRoute,uploadImage('uploads/profiles', 'image'), profileUpdate);


module.exports=userRoute