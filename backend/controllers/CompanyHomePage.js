const Employer = require("../Models/EmployerModel");
const getHomePage = async (req, res) => {
  try {
    let employerID = req.query.employerID;
    //const companyDetails = await Employer.findOne({ employerID });
    const companyDetails = await Employer.findById(employerID);
    if (companyDetails) {
      res.status(200).send(companyDetails);
    } else {
      res.status(404).send("Resource not found");
    }
  } catch (err) {
    res.status(500).send("Database error");
  }
};
module.exports = getHomePage;
