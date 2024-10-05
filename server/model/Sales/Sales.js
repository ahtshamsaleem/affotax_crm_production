const mongoose = require('mongoose');

var SalesSchema = new mongoose.Schema({
    date: {
        type: String
    },
    due_date: {
        type: String
    },
    jobDate: {
        type: String
    },
    paidDate: {
        type: String
    },
    invoice_no: {
        type: String
    },
    currency: {
        type: String
    },
    subtotal: {
        type: String
    },
    tax: {
        type: String
    },    
    discount: {
        type: String
    },    
    total: {
        type: String
    },
    saleitem_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'sale_item'
    }],
    client_id: {
        type: mongoose.Types.ObjectId,
        ref: 'client'
    },
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies'
    },
    status: {
        type: String
    },
    note: {
        type: String
    },
    jobHolder:{
        type: String
    },
    source:{
        type: String
    }
});

const Salesdb = mongoose.model('sales', SalesSchema);

module.exports = Salesdb;