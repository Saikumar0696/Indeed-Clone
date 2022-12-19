const Messages = require('../../../Models/MessageModel')
const Employer = require('../../../Models/EmployerModel')

const handle_request = async(msg, callback) => {
    const { userId } = msg;
    try{
        const ids = await Messages.find({'userId' : userId}).distinct('employerId')
        if (ids) {
            const employerDetails = await Employer.find({'_id':{$in : ids}})
            if (employerDetails) {
                callback(null, employerDetails)
            } else {
                callback(null, "404")
            }
        } else {
            callback(null, "404")
        }
    }
    catch(error){
        callback(null, "500")
    }
}

exports.handle_request = handle_request;