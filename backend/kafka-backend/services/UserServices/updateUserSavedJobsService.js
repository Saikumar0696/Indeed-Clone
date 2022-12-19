const User = require('../../../Models/UserModel')

const handle_request = async(msg, callback) => {

    const {userId, jobId} = msg
    console.log(userId, jobId)
    try {
        if (userId) {
            const jobExists = await User.findOne({savedJobs : jobId})
            console.log("jobexists : ", jobExists)
            if (jobExists) {
                const error = {
                    "error" : "Job already added to saved jobs"
                }
                callback(error, null)
            }
            const user = await User.findOneAndUpdate({_id: userId}, {$push: {"savedJobs": jobId}}, {new:true})
            if (user) {
                callback(null, user)
            } else {
                const error = {
                    "error" : "Resource not found"
                }
                callback(error, null)
            }
        } else {
            const error = {
                "error" : "Unauthorized"
            }
            callback(error, null)

        }
    } catch (error) {
        const err = {
            "error" : error
        }
        callback(err, null)
    }

}

exports.handle_request = handle_request;