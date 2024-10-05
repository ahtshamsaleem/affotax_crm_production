const mongoose = require('mongoose');

var ChartOfAccountsSchema = new mongoose.Schema({
    account_type: {
        type: String
    },
    code: {
        type: String
    },
    name: {
        type: String
    },
});

const ChartOfAccountsdb = mongoose.model('chart_of_account', ChartOfAccountsSchema);

module.exports = ChartOfAccountsdb;