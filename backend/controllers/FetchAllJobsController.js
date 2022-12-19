
// Method : GET
// Fetching all the  jobs posted by the employer
const Jobs = require("../Models/JobsModel")
const redisClient = require('../config/redisClient');
const { rPopCount } = require("../config/redisClient");
const { set } = require("mongoose");
const kafka = require("../kafka/client");

const fetchJobs = async (req, res) => {
  kafka.make_request('fetch_all_jobs', req.query, (err, results) => {
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

const fetchMostSearchedJobs = async (req, res) => {
  // const location = req.query.location
  // console.log(location)
  try {
    const data = await redisClient.get('getMostSearchedJobs')
    if (data) {
      res.status(200).send(JSON.parse(data));
    }
    else{
      const jobs = await Jobs.find({});
      console.log(jobs)
      if(jobs){
        redisClient.setEx('getMostSearchedJobs', 36000, JSON.stringify(jobs));
        res.status(200).send(jobs);
      } else {
        return res.status(400).json({
          error: error
        });
      }
    }
} catch (error) {
  console.log(error)
  return res.status(500).json({
        error: error
        });
}
}

module.exports = { fetchJobs, fetchMostSearchedJobs}
