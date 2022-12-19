const Employer = require("../Models/EmployerModel");
const employerHomePage = async (req, res) => {
  try {
    let employerID = req.query.employerID;

    const employerHome = await Employer.findById(employerID);
    if (employerHome) {
      res.status(200).send(employerHome);
    } else {
      res.status(404).send("Resource not found");
    }
  } catch (err) {
    res.status(500).send("Database error");
  }
};
module.exports = employerHomePage;
