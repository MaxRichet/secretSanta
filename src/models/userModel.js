const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    exist: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);