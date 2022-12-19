const Reviews = require("../../../Models/ReviewsModel");
const User = require("../../../Models/UserModel");
const handle_request = async (msg, callback) => {
  try {
    const review = await Reviews.findOneAndUpdate(
      { _id: msg.reviewid },
      { isApproved: "Approved" }
    );
    if (!review) {
      callback(error, null);
    }
    const user = await User.findById(review.userId);
    user.noOfAcceptedReviews = user.noOfAcceptedReviews + 1;
    user.save();
    callback(null, review);
  } catch (error) {
    callback(error, null);
  }
};

exports.handle_request = handle_request;
