const mongoose = require('mongoose');

var CompaniesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String,
    },
});

const Companiessdb = mongoose.model('companies', CompaniesSchema);

module.exports = Companiessdb;