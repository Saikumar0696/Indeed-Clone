const User = require('../../../Models/UserModel')
const Jobs = require("../../../Models/JobsModel")

const handle_request = async(msg, callback) => {
    const {userId} = msg
    console.log(userId)
    try {
        if (userId) {
            const jobs = await User.findOne({_id: userId}, {savedJobs:1, _id:0}).populate('savedJobs')
            if (jobs) {
                callback(null, jobs)
            } else {
                callback(null, "404")
            }
        } else {
            callback(null, "401")
        }   
    } catch (error) {
        console.log(error)
        callback(null, "500")
    }
}

exports.handle_request = handle_request;