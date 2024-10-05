const mongoose = require('mongoose');

var MyListPageSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

const MyListPagedb = mongoose.model('MyListPage', MyListPageSchema);

module.exports = MyListPagedb;