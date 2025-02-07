const mongoose = require('mongoose');

const requestModel = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    users : {type : mongoose.Schema.Types.ObjectId , ref : 'users'},
    musicURL :{
        type: String,
        required: true
    },
    price :{
        type : Number,
        required: true
    },
    isPaid:{
        type : Boolean,
        required:false,
    },
    orderId:{
        type: String,
        required:true,
    },
    orderAmount:{
        type: Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('request',requestModel);