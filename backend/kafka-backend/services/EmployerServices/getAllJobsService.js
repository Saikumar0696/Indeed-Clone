const Jobs = require('../../../Models/JobsModel')

const handle_request = async(msg, callback) => {

    try {
        const { employerID } = msg;
        const getJobs = await Jobs.find({ employerID: employerID });
        if (!getJobs) {
            const error = {
                "error" : "Jobs Not found"
            }
            callback(error, null)
        }
        callback(null, getJobs)
    } catch (error) {
        const err = {
            "error" : error
        }
        callback(err, null)
    }

}

exports.handle_request = handle_request;