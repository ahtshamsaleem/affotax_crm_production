const mongoose = require('mongoose');

var ProjectNameSchema = new mongoose.Schema({
    name: {
        type: String
    },
    users_list: [{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }]
});

const ProjectNameDb = mongoose.model('projectName', ProjectNameSchema);

module.exports = ProjectNameDb;