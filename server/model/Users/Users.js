const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    username: {
        type: String
    },
    phone_number: {
        type: String
    },
    emergenyc_contact: {
        type: String
    },
    start_date: {
        type: String
    },
    address: {
        type: String
    },
    end_date: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: 'role'
    }
});

const Userdb = mongoose.model('users', UserSchema);

module.exports = Userdb;