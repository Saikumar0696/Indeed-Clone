const Review = require("../../../Models/ReviewsModel");

const handle_request = async(msg, callback) => {

const { _id} = msg;

  let review = await Review.findOne({ _id: _id });

  if (!review) {
    //res.status("400").send("Error. Review doesn't Exist.");
    callback("Review doesnot exist",null)
  } else {
    review.isFeatured = !review.isFeatured;
    await review.save(async (err, result) => {
      if (err) {
        throw err;
      } else {
          const key = (msg.employerId).toString();
          const updatedReviews = await Review.find({ employerId: msg.employerId, isFeatured: true })
          if (updatedReviews) {
            console.log("set key");
            //redisClient.setEx(key, 36000, JSON.stringify(updatedReviews));
          }
       
          callback(null,review)
      }
    });
  }

}

exports.handle_request = handle_request;