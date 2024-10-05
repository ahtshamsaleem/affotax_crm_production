const mongoose = require('mongoose');

var ProposalsSchema = new mongoose.Schema({
    jobHolder: {
        type: String
    },
    clientName: {
        type: String,
    },
    companyName: {
        type: String,
    },
    subject: {
        type: String,
    },
    detailedSubject: {
        type: String,
    },
    date: {
        type: String,
    },
    deadline: {
        type: String,
    },
    jobDate: {
        type: String,
    },
    note: {
        type: String,
    },
    source: {
        type: String,
    },
    status: {
        type: String,
        default: "Proposal"
    },
});

const ProposalsDb = mongoose.model('proposal', ProposalsSchema);

module.exports = ProposalsDb;