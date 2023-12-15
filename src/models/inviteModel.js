const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let inviteSchema = new Schema ({
    group_id: {
        type: String,
        required: true
    },
    user_id: {
        type: Array,
        required: true
    },
    isAccept: {
        type: Boolean,
        default: null
    }
})

module.exports = mongoose.model('Invite', inviteSchema);