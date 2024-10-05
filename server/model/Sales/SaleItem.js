const mongoose = require('mongoose');

var SaleItemSchema = new mongoose.Schema({
    unique_id: {
        type: String
    },
    product:{
        type: String
    },
    description: {
        type: String
    },
    qty: {
        type: String
    },
    unit_price: {
        type: String
    },
    discount_percentage: {
        type: String
    },
    account: {
        type: mongoose.Types.ObjectId,
        ref: 'chart_of_account'
    },
    tax_rate: {
        type: String
    },
    amount: {
        type: String
    },
});

const SaleItemdb = mongoose.model('sale_item', SaleItemSchema);

module.exports = SaleItemdb;