const mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    client_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    partner: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    client_type: {
        type: String,
        required: true
    },
    total_hours: {
        type: String
    },
    hourly_rate: {
        type: String
    },
    book_start_date: {
        type: String
    },
    phone: {
        type: String
    },
    auth_code: {
        type: String
    },
    utr: {
        type: String
    },
    tr_login: {
        type: String
    },
    vat_login: {
        type: String
    },
    paye_login: {
        type: String
    },
    ct_login: {
        type: String
    },
    company_number: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    }
});

const Clientdb = mongoose.model('client', ClientSchema);

module.exports = Clientdb;