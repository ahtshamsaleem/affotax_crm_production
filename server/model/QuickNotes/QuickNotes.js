const mongoose = require('mongoose');

var QuickNotesSchema = new mongoose.Schema({
    id: {
        type: String
    },
    taskName: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
});

const QuickNotesDb = mongoose.model('quick_notes', QuickNotesSchema);

module.exports = QuickNotesDb;