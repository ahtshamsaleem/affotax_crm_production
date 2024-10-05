const mongoose = require('mongoose');

var SubTaskSchema = new mongoose.Schema({
    name: {
        type: String
    },
    isCompleted: {
        type: Boolean
    },
});

const SubTaskdb = mongoose.model('subTask', SubTaskSchema);

module.exports = SubTaskdb;