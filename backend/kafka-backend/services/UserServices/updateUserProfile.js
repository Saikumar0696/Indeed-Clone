const User = require('../../../Models/UserModel')

const handle_request = async(msg, callback) => {
    const {userId} = msg
    const update = msg
    console.log(userId)
    try {
        if (userId) {
            const user = await User.findOneAndUpdate({"_id":userId}, update, {new: true})
            if (user) {
                callback(null, user)
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