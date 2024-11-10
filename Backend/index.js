const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
    res.json('hai there');
});

//user authentication route
const userRoute = require('./Routes/AuthRoutes');
app.use("/api/users/",userRoute);

app.use(bodyParser.json());
// app.use(cors({origin:true}));

mongoose.connect(process.env.DB_NAME),{useNewUrlParser : true};
mongoose.connection
.once("open",() => console.log("MongoDB Connected"))
.on("error",(error) => {
    console.log(`ERROR : ${error}`);
    
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})