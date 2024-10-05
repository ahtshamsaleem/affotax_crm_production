const mongoose = require('mongoose');

var PermissionsSchema = new mongoose.Schema({
    name: {
        type: String
    },
});

const Permissionsdb = mongoose.model('permissions', PermissionsSchema);

module.exports = Permissionsdb;