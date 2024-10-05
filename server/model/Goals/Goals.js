const mongoose = require('mongoose');

var GoalsSchema = new mongoose.Schema({
    subject: {
        type: String
    },
    achievement: {
        type: Number,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    goalType: {
        type: String
    },
    jobHolder:{
        type: String
    }
});

const Goalsdb = mongoose.model('Goals', GoalsSchema);

module.exports = Goalsdb;