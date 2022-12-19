const express = require("express");
const {
  getUserReviews,
  findReviewById,
  postUserReview,
  getAllReviews,
  UpdateReviewStatus,
  getCompanyReviews,
  getSpecificCompanyReviews,
  UpdateHelpfulCount,
  featuredReviewsForSpecificcompany,
} = require("../controllers/UserReviewController");
const {
  userSalary,
  getUserSalary,
} = require("../controllers/UserSalaryController");
const getHomePage = require("../controllers/CompanyHomePage");
const {
  uploadPhoto,
  updatePhotoStatus,
} = require("../controllers/UserPhotoController");
const { getAllUserJobs } = require("../controllers/UserJobController");
const router = express.Router();

router.param("reviewId", findReviewById);
router.post("/user-review", postUserReview);
router.get("/user-review", getUserReviews);
router.get("/company-specific-reviews", getSpecificCompanyReviews);
router.get(
  "/company-specific-featured-reviews",
  featuredReviewsForSpecificcompany
);
router.post("/user-salary", userSalary);
router.get("/user-salary", getUserSalary);
router.get("/reviews", getAllReviews);
router.get("/home", getHomePage);
router.get("/whyjoinus", getHomePage);
router.put("/review/update-review-status", UpdateReviewStatus);
router.put("/review/update-helpful-count", UpdateHelpfulCount);
router.get("/companyreviews", getCompanyReviews);
router.post("/uploadphoto", uploadPhoto);
router.get("/jobs", getAllUserJobs);
router.put("/update-photo-status", updatePhotoStatus);
module.exports = router;
