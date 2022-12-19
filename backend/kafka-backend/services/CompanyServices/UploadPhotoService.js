const Employer = require("../../../Models/EmployerModel");
const handle_request = async (msg, callback) => {
  const { userId, employerId, urls } = msg;

  let emp = await Employer.findById(employerId);

  for (const url of urls) {
    emp.photos.push({
      path: url,
      userId,
    });
  }

  await emp.save((err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, emp);
    }
  });
};

exports.handle_request = handle_request;
