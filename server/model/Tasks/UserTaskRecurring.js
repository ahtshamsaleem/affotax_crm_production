const mongoose = require('mongoose');

var UserTaskRecurringSchema = new mongoose.Schema({
    projectname_id: {
        type: mongoose.Types.ObjectId,
        ref: 'projectName'
    },
    Jobholder: {
        type: String
    },
    description: {
        type: String,
    },
    hrs: {
        type: String,
    },
    interval: {
        type: String
    },
    nextUpdate: {
        type: String
    },
    dates: [{
        date: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        notes: {
            type: String,
            default: ""
        }
    }],
    isActive:{
        type: Boolean,
        default: true
    }
});

const UserTaskRecurringDb = mongoose.model('userTaskRecurring', UserTaskRecurringSchema);

module.exports = UserTaskRecurringDb;