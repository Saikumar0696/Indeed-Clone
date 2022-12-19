const Reviews = require('../../../Models/ReviewsModel')

const handle_request = async(msg, callback) => {
    const {userId} = msg
    console.log(userId)
    try {
        if (userId) {
            const reviews = await Reviews.find({userId})
            if (reviews) {
                callback(null, reviews)
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