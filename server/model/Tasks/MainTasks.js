const mongoose = require('mongoose');

var MainTaskSchema = new mongoose.Schema({
    name: {
        type: String
    },
    subtasks_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'subTask'
    }],
});

const MainTaskdb = mongoose.model('mainTask', MainTaskSchema);

module.exports = MainTaskdb;