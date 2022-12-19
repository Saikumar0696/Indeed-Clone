const express = require("express");
const router = express.Router();
const {
  createMongoEmployer,
  updateEmployer,
  getEmployerDetails,
  companyPicsUpload,
  employerReviewUpdate,
} = require("../controllers/EmployerController");
const employerHomePage = require("../controllers/EmployerHomePage");
const { updateJobApplication } = require('../controllers/JobController');

router.post("/updateemployer", updateEmployer);
router.get("/employerdetails/:employerID", getEmployerDetails);
router.get("/home", employerHomePage);
router.post("/employer_pic_upload", companyPicsUpload);
router.post("/reviewupdate", employerReviewUpdate);
router.put('/update-application', updateJobApplication);

module.exports = router;
