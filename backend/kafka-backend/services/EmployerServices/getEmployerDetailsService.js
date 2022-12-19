const Employer = require("../../../Models/EmployerModel");

const handle_request = async(msg, callback) => {

    try {
        const { employerID } = msg;
        
        console.log("employerID ", employerID);
        const employerExists = await Employer.findOne({ _id: employerID });
        if (!employerExists) {
            callback("Error. Employer Not Found!",null)
        }
        callback(null,employerExists)
      } catch (error) {
        callback("500 - Internal Server Error "+error,null)
      }
    
    

}

exports.handle_request = handle_request;