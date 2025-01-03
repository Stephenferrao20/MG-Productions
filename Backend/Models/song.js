const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    },
    songURL:{
        type: String,
        required: true
    },
    album: {
        type: String,
    },
    artist: {
        type: String,
        required: true
    }
}
    ,
    {
        timestamps: true
    }
)


module.exports = mongoose.model('song', songSchema);