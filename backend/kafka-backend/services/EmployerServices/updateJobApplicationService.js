const Applications = require("../../../Models/ApplicationModel");

const handle_request = async(msg, callback) => {

    try{
        const application = await Applications.findOne({$and: [{userId: msg.userId},{jobId: msg.jobId},{employerId: msg.employerId}]});
        //console.log("Job Application: ", application)
        if(application){
            application.set({
                status: msg.status
            })

            await application.save()

            callback(null, application)
        }
        else{
            const error = {
                "error" : "Job Application not found"
            }
        }
    }
    catch(error){

        const err = {
            "error" : error
        }
    }

}

exports.handle_request = handle_request;