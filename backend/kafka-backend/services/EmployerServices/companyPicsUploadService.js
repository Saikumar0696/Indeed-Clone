const Employer = require("../../../Models/EmployerModel");

const handle_request = async(msg, callback) => {
    const { employerID, urls, fieldName } = msg;
    try {
      let emp = await Employer.findOne({ _id: employerID });
      if (!emp) {
        callback("Error. Employer Not Found!",null)
      } else {
        if (fieldName === "companyBanner") emp.companyBanner = urls[0];
        else if (fieldName === "companyLogo") emp.companyLogo = urls[0];
        else if (fieldName === "companyCeoPicture")
          emp.companyCeoPicture = urls[0];
  
        await emp.save((err, result) => {
          if (err) {
            throw err;
          } else {
            callback(null,emp)
          }
        });
      }
    } catch (error) {
        callback("500 - Internal server Error",null)
    }
    
    

}

exports.handle_request = handle_request;