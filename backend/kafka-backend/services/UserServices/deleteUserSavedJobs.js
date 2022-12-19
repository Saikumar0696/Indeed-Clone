const User = require('../../../Models/UserModel')

const handle_request = async(msg, callback) => {

    const {userId, jobId} = msg
    console.log(userId, jobId)
    try {
        if (userId) {
            const user = await User.findOneAndUpdate({_id: userId}, {$pull: {"savedJobs": jobId}}, {new:true})
            if (user) {
                callback(null, "200")
            } else {
                callback(null, "404")
            }
        } else {
            callback(null, "401")
        }   
    } catch (error) {
        callback(null, "500")
    }
}

exports.handle_request = handle_request;