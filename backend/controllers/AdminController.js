const asyncHandler = require("express-async-handler");
const kafka = require("../kafka/client");


const getTopRatedCompanies = asyncHandler (async (req, res) => {

    kafka.make_request('top_rated_companies', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            res.status(200).json(results)
        }
    })
});

const getTopReviewedCompanies = asyncHandler(async(req, res) => {

    kafka.make_request('top_reviewed_companies', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            res.status(200).json(results)
        }
    })
})

const getTopAcceptedReviewUsers = asyncHandler(async(req, res) => {

    kafka.make_request('top_accepted_review_users', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            res.status(200).json(results)
        }
    })
})

const getTopRatedCEOs = asyncHandler(async(req, res) => {

    kafka.make_request('top_accepted_rated_ceos', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            res.status(200).json(results)
        }
    })
})

const getAllCompanies = asyncHandler(async(req, res) => {

    kafka.make_request('get_all_companies', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            res.status(200).json(results)
        }
    })
})


module.exports = { getTopRatedCompanies, getTopReviewedCompanies, getTopAcceptedReviewUsers, getTopRatedCEOs, getAllCompanies }