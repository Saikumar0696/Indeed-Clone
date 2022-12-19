const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required:true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required:true
    },
    emailId : {
        type: String
    },
    resume: {
        type: String
    },
    cv:{
        type: String
    },
    status: {
        type: String,
    },
},{timestamps:true})

const Application = mongoose.model('Application', applicationSchema)
module.exports = Application