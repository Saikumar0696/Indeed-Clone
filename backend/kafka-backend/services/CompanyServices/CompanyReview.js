const Employer = require("../../../Models/EmployerModel");
const handle_request = async (msg, callback) => {
  let location = msg.location;
  let companyName = msg.company;
  console.log(location);
  console.log(companyName);

  try {
    let companies = [];
    if (location && companyName) {
      companies = await Employer.find({
        $and: [
          { city: { $eq: location } },
          { companyName: { $eq: companyName } },
        ],
      });
    } else {
      companies = await Employer.find({
        $or: [
          { city: { $eq: location } },
          { companyName: { $eq: companyName } },
        ],
      });
    }

    let companyNames = [];
    companies.forEach((company) => {
      companyNames.push({
        companyName: company.companyName,
        rating: company.averageRating,
        id: company._id,
        noOfRatings: company.noOfRatings,
      });
    });
    callback(null, { companyNames });
  } catch (error) {
    console.log("error");
    callback(error, null);
  }
};

exports.handle_request = handle_request;
