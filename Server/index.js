const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io");
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const userRoutes = require("./Routes/userRoute")
const ChatRoutes = require("./Routes/chatRoute")
const messageRoutes = require("./Routes/messageRoute")



app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/chats", ChatRoutes)
app.use("/api/messages", messageRoutes)





const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URL
const ExpressServer = app.listen(port, (req, res) => {
    console.log(`**************app listen successfully on Port : ${port} **************`);


})




mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connected successfully!");
}).catch((err) => {
    console.error("Mongo connection failed. Details:");
    console.error(err);
});
//  socket 
const io = new Server(ExpressServer, { cors: process.env.CLIENT_URL });

let onlineUser = []
io.on("connection", (socket) => {

    // add user online 
    socket.on("addNewUser", (userId) => {
        !onlineUser.some(user => user.userId === userId) &&
            onlineUser.push({
                userId,
                socketId: socket.id
            })

        // send online 
        io.emit('getOnlineUsers', onlineUser)
        console.log(onlineUser);
    })

    // add message
    socket.on("sendMessage", (message) => {
        const user = onlineUser.find(user => user.userId === message.recipientId)
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
            io.to(user.socketId).emit("getNoification", {
                senderId: message.senderId,
                isread: false,
                date: new Date()
            })
        }
    })


    // disconnect
    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter(user => user.socketId !== socket.id)
        io.emit('getOnlineUsers', onlineUser)
    })
});
