const mongoose = require('mongoose');
console.log("message");
const messageSchema = mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer", 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messages: [{
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        messageText: {
            type: String,
        },
        attachment:{
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]

},{
    timestamps: true
})

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
