const mongoose = require('mongoose');

var RecurringTasksCategorySchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
    },
    deleteAble: {
        type: Boolean,
        default: true
    },
    recurring_task_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'recurring_tasks'
    }],
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
});

const RecurringTasksCategoryDb = mongoose.model('recurring_tasks_category', RecurringTasksCategorySchema);

module.exports = RecurringTasksCategoryDb;