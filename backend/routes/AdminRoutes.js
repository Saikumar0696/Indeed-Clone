const express = require("express");

const { getTopRatedCompanies, getTopReviewedCompanies, getTopAcceptedReviewUsers, getTopRatedCEOs, getAllCompanies } = require('../controllers/AdminController');
const router = express.Router();

router.route("/get-top-ratedcomapnies").get(getTopRatedCompanies);
router.route("/get-top-reviewedcomapnies").get(getTopReviewedCompanies);
router.route("/get-top-acceptedreview-users").get(getTopAcceptedReviewUsers);
router.route("/get-top-rated-ceos").get(getTopRatedCEOs);
router.route("/get-all-companies").get(getAllCompanies);

module.exports = router;
