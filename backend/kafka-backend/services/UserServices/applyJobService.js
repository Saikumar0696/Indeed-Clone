const Application = require('../../../Models/ApplicationModel')
const User = require('../../../Models/UserModel')

const handle_request = async(msg, callback) => {

    const {userId, jobId, employerId, email, resume} = msg
    try {
        if (userId) {
            const applicationExists = await Application.findOne({$and: [
                    {
                        "userId": userId
                    },
                    {
                        "employerId": employerId
                    },
                    {
                        "jobId": jobId
                    }
                ]})
            console.log("Application exists", applicationExists)
            if (applicationExists) {
                const error = {
                    "error" : "Job already applied"
                }
                callback(error, null)
            } else {
                const appResult = await Application.create({
                    userId : userId,
                    jobId: jobId,
                    employerId: employerId,
                    status : "Applied",
                    resume: resume,
                    emailId: email
                });

                //console.log("App Result : ", appResult);
                if (appResult) {
                    await User.findOneAndUpdate({_id: userId}, {$push: {"appliedJobs": jobId}}, {new:true})
                    callback(null, "Job Applied Successfully")
                } else {
                    const error = {
                        "error" : "Resource not found"
                    }
                    callback(err, null)
                }
            }
        } else {
            const error = {
                "error" : "Unauthorized"
            }
            callback(err, null)
        }
    } catch (error) {
        const err = {
            "error" : error
        }
        callback(err, null)
    }

}

exports.handle_request = handle_request;