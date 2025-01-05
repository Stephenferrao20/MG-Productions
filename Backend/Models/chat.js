const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    chatName : {type : String , trim : true},
    users : [{type : mongoose.Schema.Types.ObjectId , ref : 'users'}],
    latestMessage : {type : mongoose.Schema.Types.ObjectId , ref : 'message'}
},{
    timestamps : true
});

module.exports = mongoose.model('chat', chatModel);