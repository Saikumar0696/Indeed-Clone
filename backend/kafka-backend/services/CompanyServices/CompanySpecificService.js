const Reviews = require("../../../Models/ReviewsModel");
const handle_request = async (msg, callback) => {
  const sortVal = msg.sort ? msg.sort : "createdAt";
  console.log(msg.sort);
  console.log(msg.employerId);

  try {
    let review;
    if (sortVal === "overallRating")
      review = await Reviews.find({ employerId: msg.employerId }).sort({
        overallRating: -1,
      });
    else if (sortVal === "isHelpfulCount")
      review = await Reviews.find({ employerId: msg.employerId }).sort({
        isHelpfulCount: -1,
      });
    else
      review = await Reviews.find({ employerId: msg.employerId }).sort({
        createdAt: -1,
      });

    if (!review) {
      callback(error, null);
    }
    callback(null, review);
  } catch (error) {
    callback(error, null);
  }
};

exports.handle_request = handle_request;
