const Reviews = require("../Models/ReviewsModel");
const User = require("../Models/UserModel");
const kafka = require("../kafka/client");

const updateUserSavedJobs = async (req, res) => {
    kafka.make_request('update_user_saved_jobs', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            if(results){
                res.status(200).send(results)
            }
            else{
                res.status(400).json({
                    error: "Resource Not Found"
                })
            }
        }
    })
} 

const deleteUserSavedJobs = async (req, res) => {
    kafka.make_request('delete_user_saved_jobs', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send("deleted job successfully")
          }
    }) 
}

const getUserSavedJobs = async (req, res) => {
    kafka.make_request('get_user_saved_jobs', req.query, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })
}

const getUserAppliedJobs = async (req, res) => {
    kafka.make_request('get_user_applied_jobs', req.query, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })
}

const getUserReviews = async (req, res) => {
    kafka.make_request('get_user_reviews', req.query, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })
}

const getUserProfile = async (req, res) => {
    kafka.make_request('get_user_profile', req.query, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })
}

const updateUserProfile = async (req, res) => {
    kafka.make_request('update_user_profile', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })
}

module.exports = { updateUserSavedJobs, deleteUserSavedJobs, getUserSavedJobs, getUserAppliedJobs, getUserReviews, getUserProfile, updateUserProfile }