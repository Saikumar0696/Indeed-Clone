const Salaries = require("../../../Models/SalaryModel");
const handle_request = async (msg, callback) => {
  console.log("get user salary");
  try {
    const salary = await Salaries.find({}).sort({ currentPay: -1 });
    if (!salary) {
      console.log("error");
      callback(error, null);
    }
    callback(null, salary);
  } catch (error) {
    console.log("error");
    callback(error, null);
  }
};

exports.handle_request = handle_request;
