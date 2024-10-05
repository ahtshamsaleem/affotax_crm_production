const mongoose = require('mongoose');

var HosueNoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    }
});

const HosueNoDb = mongoose.model('HouseNoList', HosueNoSchema);

module.exports = HosueNoDb;