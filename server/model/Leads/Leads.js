const mongoose = require('mongoose');

var LeadSchema = new mongoose.Schema({
    companyName: {
        type: String
    },
    clientName: {
        type: String
    },
    department: {
        type: String,
    },
    source: {
        type: String
    },
    brand: {
        type: String
    },
    partner: {
        type: String
    },
    createDate: {
        type: String
    },
    followUpDate: {
        type: String
    },
    jobDate: {
        type: String
    },
    email: {
        type: String
    },
    note: {
        type: String
    },
    stage:{
        type: String,
    },
    status:{
        type: String,
        default: "In-Progress"
    },
    manager_id:{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    Jobholder_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    reason:{
        type: String,
    }
});

const LeadDb = mongoose.model('lead', LeadSchema);

module.exports = LeadDb;