const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema ({
    admin_id: {
        type: String,
        required: true
    },
    members_id: {
        type: Array,
    }
})

module.exports = mongoose.model('Group', groupSchema);