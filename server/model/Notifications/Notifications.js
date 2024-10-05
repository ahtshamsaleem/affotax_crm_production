const mongoose = require('mongoose');

var NotiSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    redirectLink:{
        type: String
    },
    isRead:{
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
});

const Notidb = mongoose.model('notification', NotiSchema);

module.exports = Notidb;