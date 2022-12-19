const Messages = require('../../../Models/MessageModel')

const handle_request = async(msg, callback) => {
    console.log(msg)
    try{
        const getMessage = await Messages.findById({_id: msg._id})
        getMessage.messages.push({
            from: msg.message.from,
            to: msg.message.to,
            messageText: msg.message.messageText
        })
        await getMessage.save()
        if(getMessage){
            callback(null, getMessage)
        }
        else{
            callback(null, "400")
        }
    }
    catch(error){
        console.log(error)
        callback(null, "500")
    }
}

exports.handle_request = handle_request;