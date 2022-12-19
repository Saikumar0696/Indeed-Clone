const Employer = require("../../../Models/EmployerModel");

const handle_request = async(msg, callback) => {

    //console.log(typeof(msg.employerID))
    try {
        const employerExists = await Employer.findOne({
          employerID: msg.employerID,
        });
        if (!employerExists) {
            console.log("Employer not found!")
            callback("Error. Employer doesn't Exist.",null)
          //res.status("400").send("Error. Employer doesn't Exist.");
        } else {
          const employer = await employerExists.updateOne({
            ...msg,
          });
    
          if (employer) {
            const result = {
              ...msg,
            };
            console.log("Rs"+result)
            callback(null,result)
          } else {
            console.log("error 400")
            
            callback("400 Bad Request: Please try again later. ",null)
          }
        }
      } catch (error) {
        console.log("error 500"+error)
        callback("500 Internal Server Error "+error,null)
      }

}

exports.handle_request = handle_request;