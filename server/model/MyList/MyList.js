const mongoose = require('mongoose');

var MyListSchema = new mongoose.Schema({
    name: {
        type: String
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: 'role'
    }
});

const MyListdb = mongoose.model('MyList', MyListSchema);

module.exports = MyListdb;