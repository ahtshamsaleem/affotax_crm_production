const mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    job_name: {
        type: String
    },
    year_end:{
        type: String
    },
    job_deadline:{
        type: String
    },
    work_deadline:{
        type: String
    },
    hours:{
        type: String
    },
    fee:{
        type: String
    },
    job_status:{
        type: String,
    },
    notes:{
        type: String,
    },
    subscription:{
        type: String,
    },
    manager_id:{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    job_holder_id:{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    client_id: {
        type: mongoose.Types.ObjectId,
        ref: 'client'
    }
});

const Jobsdb = mongoose.model('jobs', JobSchema);

module.exports = Jobsdb;