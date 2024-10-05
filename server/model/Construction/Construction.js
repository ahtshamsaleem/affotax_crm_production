const mongoose = require('mongoose');

var ConstructionSchema = new mongoose.Schema({
    houseNoList_id: {
        type: mongoose.Types.ObjectId,
        ref: 'HouseNoList'
    },
    Task: {
        type: String,
    },
    hrs: {
        type: String,
    },
    Jobholder_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    startDate: {
        type: Date
    },
    completationDate: {
        type: Date
    },
    completationDateActual: {
        type: Date
    },
    JobDate: {
        type: Date
    },
    Note: {
        type: String
    },
    budgetPlan: {
        type: String
    },
    budgetActual: {
        type: String
    },
    status: {
        type: String
    },
    Manager: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    comments: {
        type: String
    },
    contractor: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    }
});

const ConstructionDb = mongoose.model('construction', ConstructionSchema);

module.exports = ConstructionDb;