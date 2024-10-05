const mongoose = require('mongoose');

var UserListSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userList: [
        {
            id: {
                type: Number,
                required: true
            },
            page: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                required: true
            }
        }
    ]
});

const UserListdb = mongoose.model('userList', UserListSchema);

module.exports = UserListdb;