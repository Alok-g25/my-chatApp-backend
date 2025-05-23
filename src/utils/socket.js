const { Server } = require("socket.io")
const http = require("http")
const express = require("express")



const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});

function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

//   used to online users 
const userSocketMap = {} // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected users 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    console.log(userSocketMap, "userSocketMap")

    socket.on("disconnect", () => {
        console.log("A user Disconneted", socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
})


module.exports = { io, server, app,getReceiverSocketId }