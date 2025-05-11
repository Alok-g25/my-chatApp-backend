const Message = require("../models/message.model");
const mongoose = require("mongoose");
const { getReceiverSocketId,io } = require("../utils/socket.js");



const createMessage = async (req, res) => {
    try {
        const myId = req?.user?._id;
        const anotherUserId = req.params.id;
        const { text } = req.body;
        let messageFile;
        if (req.file) {
            messageFile = `${process.env.SERVER_RUN}/uploads/messageFiles/${req.file.filename}`; // Save path to DB
        }
        // console.log(messageFile,"messageFile")

        const newMessage = new Message({
            senderId: myId,
            recieverId: anotherUserId,
            messageFile,
            text
        })

        console.log(newMessage)

        await newMessage.save()
        // real time data 
        const reciverSocketId=getReceiverSocketId(anotherUserId)

        // console.log(reciverSocketId,"***********************reciverSocketId")
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage)
        }
        res.json({
            status: 201, success: true,
            message: "User registered successfully",
            message: newMessage,
        });

    } catch (error) {
        console.error("Error in create message controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching messages. Please try again later."
        });
    }
}


const getUserMessages = async (req, res) => {
    try {
        const myId = req?.user?._id;
        const anotherUserId = req?.params?.id;

        console.log(myId, anotherUserId, "***********************");

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: anotherUserId },
                { senderId: anotherUserId, recieverId: myId },
            ],
        });

        if (!messages || messages.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No conversation found between you and this user."
            });
        }

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully.",
            messages
        });

    } catch (error) {
        console.error("Error in getUserMessages controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching messages. Please try again later."
        });
    }
};



module.exports = { getUserMessages, createMessage }