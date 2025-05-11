const express =require("express");
const userRoute = require("./userRoute");
const messageRoute = require("./messageRoute");

const Route=express.Router();


Route.use("/messages",messageRoute)
Route.use("/user",userRoute)



module.exports= Route;