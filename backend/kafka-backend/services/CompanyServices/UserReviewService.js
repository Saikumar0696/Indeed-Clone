const Reviews = require("../../../Models/ReviewsModel");
const handle_request = async (msg, callback) => {
  try {
    const review = await Reviews.find({ userId: msg.userId });

    if (!review) {
      callback(error, null);
    }
    callback(null, review);
  } catch (error) {
    callback(error, null);
  }
};

exports.handle_request = handle_request;
