const mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true 
    }
});

const Pagedb = mongoose.model('page', PageSchema);

module.exports = Pagedb;