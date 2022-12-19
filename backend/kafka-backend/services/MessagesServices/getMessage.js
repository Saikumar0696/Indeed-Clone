const Messages = require('../../../Models/MessageModel')

const handle_request = async(msg, callback) => {
    const { userId, employerId } = msg;
    console.log(userId, employerId)
    try{
        const messages = await Messages.findOne({$and: [
            {
                "userId": userId
            },
            {
                "employerId": employerId
            }
        ]});
        if (messages) {
            callback(null, messages)
        } else {
            callback(null, "404")
        }
        
    }
    catch(error){
        callback(null, "500")
    }
}

exports.handle_request = handle_request;