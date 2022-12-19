const Employer = require("../../../Models/EmployerModel");
const handle_request = async (msg, callback) => {
  try {
    let emp = await Employer.findOneAndUpdate(
      { _id: msg.employerId, "photos._id": msg.photoId },
      { $set: { "photos.$.status": true } }
    );
    if (emp) {
      callback(null, emp);
    }
  } catch (error) {
    callback(error, null);
  }
};

exports.handle_request = handle_request;
