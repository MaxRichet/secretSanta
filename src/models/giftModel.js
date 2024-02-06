const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let giftSchema = new Schema ({
    gift: {
        type: Array
    },
    group_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Gift', giftSchema);