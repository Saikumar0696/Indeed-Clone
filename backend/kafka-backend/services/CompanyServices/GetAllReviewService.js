const Reviews = require("../../../Models/ReviewsModel");
const handle_request = async (msg, callback) => {
  try {
    const review = await Reviews.find({});
    if (!review) {
      console.log("error");
      callback(error, null);
    }
    callback(null, review);
  } catch (error) {
    console.log("error");
    callback(error, null);
  }
};

exports.handle_request = handle_request;
