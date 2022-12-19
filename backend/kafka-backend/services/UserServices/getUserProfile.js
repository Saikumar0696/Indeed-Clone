const User = require('../../../Models/UserModel')

const handle_request = async(msg, callback) => {
    const {userId} = msg
    console.log(userId)
    try {
        if (userId) {
            const user = await User.findById({_id:userId})
            if (user) {
                callback(null, user)
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