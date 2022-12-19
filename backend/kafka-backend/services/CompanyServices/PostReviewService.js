const Reviews = require("../../../Models/ReviewsModel");
const Employer = require("../../../Models/EmployerModel");
const handle_request = async (msg, callback) => {
  console.log("Post User Review");
  const {
    overallRating,
    workHappinessScore,
    learningScore,
    appreciationScore,
    reviewRole,
    reviewTitle,
    city,
    state,
    reviewSummary,
    yourReview,
    pros,
    cons,
    isApproved,
    isFeatured,
    interviewPreparation,
    userId,
    employerId,
  } = msg;
  const newReview = new Reviews({
    overallRating,
    reviewSummary,
    reviewTitle,
    reviewRole,
    workHappinessScore,
    learningScore,
    appreciationScore,
    city,
    state,
    yourReview,
    pros,
    cons,
    isApproved,
    isFeatured,
    interviewPreparation,
    userId,
    employerId,
  });
  await newReview.save((err, result) => {
    if (err) {
      callback(err, null);
    }
  });
  console.log(employerId);
  let emp = await Employer.findById(employerId);
  let averageWorkHappinessScore = 0;
  let averageRating = 0;
  let averageLearningScore = 0;
  let averageAppreciationScore = 0;
  emp.noOfRatings = emp.noOfRatings + 1;

  averageRating =
    (emp.averageRating * (emp.noOfRatings - 1) + parseInt(overallRating)) /
    emp.noOfRatings;
  averageWorkHappinessScore =
    (((emp.averageWorkHappinessScore / 20) * (emp.noOfRatings - 1) +
      parseInt(workHappinessScore)) /
      emp.noOfRatings) *
    20;
  averageLearningScore =
    (((emp.averageLearningScore / 20) * (emp.noOfRatings - 1) +
      parseInt(learningScore)) /
      emp.noOfRatings) *
    20;
  averageAppreciationScore =
    (((emp.averageAppreciationScore / 20) * (emp.noOfRatings - 1) +
      parseInt(appreciationScore)) /
      emp.noOfRatings) *
    20;

  emp.averageRating = averageRating.toFixed(2);
  emp.averageWorkHappinessScore = averageWorkHappinessScore.toFixed(2);
  emp.averageLearningScore = averageLearningScore.toFixed(2);
  emp.averageAppreciationScore = averageAppreciationScore.toFixed(2);
  console.log(emp.averageRating);

  emp.save((err) => {
    if (err) throw err;
    callback(err, null);
  });

  callback(null, newReview);
};

exports.handle_request = handle_request;
