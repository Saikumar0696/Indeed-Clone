const Jobs = require('../../../Models/JobsModel')

const handle_request = async(msg, callback) => {

    try {
        const job = await Jobs.create({
            ...msg,
        });

        if (job) {
            console.log(job)
            //res.status(201).send(job);
            callback(null, job);
        } else {
            //res.status("400");
            const error = {
                "error" : "400 Bad Request: Please try again later."
            }
            //throw new Error("400 Bad Request: Please try again later. ");
            callback(error, null)
        }
    } catch (error) {
        //res.status(500).send("Database error");
        const err = {
            "error" : "Database error"
        }
    }

}

exports.handle_request = handle_request;