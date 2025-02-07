const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const Razorpay = require('razorpay');

require('dotenv').config();
app.use(cors({origin:true}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
    res.json('hai there');
});

//user authentication route
const userRoute = require('./Routes/AuthRoutes');
app.use("/api/users/",userRoute);

//Album routes
const albumRoute = require('./Routes/albums');
app.use("/api/albums/",albumRoute);

// //Artist routes
const artistRoute = require('./Routes/artist');
app.use("/api/artists/",artistRoute);

// //Song routes
const songRoute = require('./Routes/songs');
app.use("/api/songs/",songRoute);

// //Chat routes
const chatRoute = require('./Routes/chat');
app.use("/api/chats/",chatRoute);

// //Message routes
const messageRoute = require('./Routes/message');
app.use("/api/messages/", messageRoute);

// //Request routes
const requestRoute = require('./Routes/request');
app.use("/api/request/", requestRoute);


// //Payment routes
const paymentRoute = require('./Routes/payment');
app.use("/api/payment/",paymentRoute);


mongoose.connect(process.env.DB_NAME),{useNewUrlParser : true , useUnifiedTopology : true};
mongoose.connection
.once("open",() => console.log("MongoDB Connected"))
.on("error",(error) => {
    console.log(`ERROR : ${error}`);
    
})
const server = app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on port ${PORT}`);
});

const io = require('socket.io')(server,{
    pingTimeout:60000, 
    cors:{
        origin:"http://localhost:5173",
    }
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on("setup",(userData) =>{
        socket.join(userData?._id);
        socket.emit("Connected");
    })

    socket.on("join chat",(room) =>{
        socket.join(room);
        console.log("user joined room " + room);
    })

    socket.on("new message",(newMessageRecieved) =>{
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user => {
            if(user._id === newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved",newMessageRecieved);
        });
    })
});