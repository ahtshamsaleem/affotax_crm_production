const mongoose = require('mongoose');

var RecurringTasksSchema = new mongoose.Schema({
    id: {
        type: String
    },
    task: {
        type: String,
    },
    category_id: {
        type: String,
    },
    isChecked: {
        type: Boolean,
        default: false
    },
});

const RecurringTasksDb = mongoose.model('recurring_tasks', RecurringTasksSchema);

module.exports = RecurringTasksDb;