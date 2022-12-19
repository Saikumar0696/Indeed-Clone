const Salaries = require("../../../Models/SalaryModel");
const handle_request = async (msg, callback) => {
  const { jobTitle, currentPay, companyName, isWorking, endDate, jobLocation } =
    msg;
  const usersSalary = await Salaries.create({
    jobTitle,
    currentPay,
    companyName,
    isWorking,
    endDate,
    jobLocation,
  });
  const data = {
    _id: usersSalary._id,
    currentPay: usersSalary.currentPay,
    companyName: usersSalary.companyName,
  };
  callback(null, data);
};

exports.handle_request = handle_request;
