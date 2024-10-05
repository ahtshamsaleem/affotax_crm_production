const mongoose = require('mongoose');

var MessageIdsSchema = new mongoose.Schema({
    
    ticket_id: {
        type: mongoose.Types.ObjectId,
        ref: 'tickets'
    },
    message_id: {
        type: String
    },
    messageSentBy: {
        type: String,
        require: false
    },
    mail_thread_id: {
        type: String,
    },
});

const MessageIdsDb = mongoose.model('messageIds', MessageIdsSchema);

module.exports = MessageIdsDb;