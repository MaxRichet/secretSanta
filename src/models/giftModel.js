const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let giftSchema = new Schema ({
    giver_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    group_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Gift', giftSchema);