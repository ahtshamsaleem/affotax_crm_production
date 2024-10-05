const mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true 
    }, 
    pages: [{ 
        isChecked:{
            type: Boolean
        },
        name:{
            type: String
        },
        permissions: [{
            isChecked:{
                type: Boolean
            },
            name:{
                type: String
            }
        }]
    }],
});

const Roledb = mongoose.model('role', RoleSchema);

module.exports = Roledb;