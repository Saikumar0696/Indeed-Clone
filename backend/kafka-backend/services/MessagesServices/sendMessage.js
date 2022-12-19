const Messages = require('../../../Models/MessageModel')

const handle_request = async(msg, callback) => {
    try{
        const newMessage = await Messages.create({
            employerId: msg.employerId,
            userId: msg.userId
        })
        newMessage.messages.push(
            {from : msg.message.from,
                to: msg.message.to,
                messageText: msg.message.messageText
            })

        await newMessage.save()
        if(newMessage){
            callback(null, newMessage)
        }
        else{
            callback(null, "400")
        }
    }
    catch(error){
        callback(null, "500")
    }
}

exports.handle_request = handle_request;