const mongoose = require('mongoose');

var TemplatesCategoriesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    },
});

const TemplatesCategoriesdb = mongoose.model('templates_categories', TemplatesCategoriesSchema);

module.exports = TemplatesCategoriesdb;