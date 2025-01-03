const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    },
}, {
    timestamps: true
}
);

module.exports = mongoose.model('album', albumSchema);

