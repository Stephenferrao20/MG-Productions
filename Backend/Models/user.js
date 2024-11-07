const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:{
        type:String,
        required:true
    },name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;