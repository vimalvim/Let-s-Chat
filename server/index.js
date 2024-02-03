const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoutes');

const app = express();
const socket=require('socket.io');
require('dotenv').config();

app.use(express.json());
const port = process.env.PORT

// middleware
app.use(cors({
    origin: "*",
    methods: 'GET,PUT,POST,DELETE',
  }));
//   app.use(cors({origin:true}));

app.use("/api/auth",userRoutes);
app.use("/api/messages", messageRoutes);

// const db = process.env.MONGO_URL 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
})
.then(()=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log(err.message);
});


const server = app.listen(port,function(){
    console.log('Server Started on Port :'+`${port} `)

} )


const io = socket(server, {
    cors:{
        origin:"*",
        credentials :true, 

    },
});


//too store all the online users in this map.
global.onlineUsers = new Map();


io.on("connection",(socket)=> {
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id)
    });

    // socket.on("send-msg", (data)=>{
    //     const sendUserSocket = onlineUsers.get(data.to);
    //     if(sendUserSocket) {
    //         socket.to(sendUserSocket).emit("msg-receive", data.message);
    //     }
    // });
    // socket.on("send-msg", (data)=>{
    //     const sendUserSocket = onlineUsers.get(data.to);
    //     if(sendUserSocket) {
    //         socket.to(sendUserSocket).emit("msg-receive", data.message);
    //     }
    // });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("receive-message", data.message);
        }
    });
    
    
});

