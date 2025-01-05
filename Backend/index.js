const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

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

mongoose.connect(process.env.DB_NAME),{useNewUrlParser : true};
mongoose.connection
.once("open",() => console.log("MongoDB Connected"))
.on("error",(error) => {
    console.log(`ERROR : ${error}`);
    
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})