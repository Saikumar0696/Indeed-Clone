const Employer = require("../../../Models/EmployerModel");

const handle_request = async(msg, callback) => {

    try {
        const review = await Employer.find({});
        if (!review) {
            const err = {
                "error" : "Invalid request"
            }
            callback(err, null)
        }
        callback(null, review);
    } catch (error) {
        const err = {
            "error" : "Internal Server Error!"
        }
        callback(err, null)
    }

}

exports.handle_request = handle_request;