/* 
@ POST
/indeed/employer/post-job
Employer Post Job Route
 */
const mongoose = require("mongoose");
const Jobs = require("../Models/JobsModel");
const Users = require("../Models/UserModel");
const Reviews = require("../Models/ReviewsModel");
const Applications = require("../Models/ApplicationModel");
const kafka = require("../kafka/client");
const createJob = async (req, res) => {

  kafka.make_request('create_job', req.body, (err, results) => {
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
          error: "Please try again later"
        })
      }
    }
  })
};

/* 
@ Get
/indeed/employer/jobs-posted
Employer Get All Jobs
 */

const getAllJobs = async (req, res) => {
  kafka.make_request('get_all_jobs', req.params, (err, results) => {
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
          error: "Resource not found"
        })
      }
    }
  })
};

const getJobApplicants = async (req, res) => {

  const { jobId, employerId } = req.params
  kafka.make_request('get_job_applicants', { jobId, employerId }, (err, results) => {
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
          error: "Resource not found"
        })
      }
    }
  })

};

const updateJobApplication = async(req, res) => {

  const { jobId, employerId, userId, status } = req.body
  kafka.make_request('update_job_application', { jobId, employerId, userId, status }, (err, results) => {
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
          error: "Resource not found"
        })
      }
    }
  })

  /*try{
    const application = await Applications.findOne({$and: [{userId: req.body.userId},{jobId: req.body.jobId},{employerId: req.body.employerId}]});

    if(application){
      application.set({
        status: req.body.status
      })

      await application.save()

      res.status(200).send(application);
    }
    else{
      res.status(400).send("Job Application not found")
    }
  }
  catch(error){
    res.status(500).send("Internal Server Error");
  }*/
}

const jobApplications = async (req, res) => {
  const employerID = mongoose.Types.ObjectId(req.params.id);
  const dateYear = req.params.year;
  let currDate, nextDate;
  if (dateYear === "1990") {
    console.log("Current Year ", dateYear);
    currDate = new Date(1990, 0, 1);
    nextDate = new Date();
  } else {
    console.log("Not Current Year ", dateYear);
    currDate = new Date(dateYear, 0, 1);
    nextDate = new Date(dateYear, 11, 31);
  }
  console.log("Aggregation Year ", currDate.toString());
  console.log("Next Aggregation Year ", nextDate.toString());
  console.log("Req.params", employerID);
  try {
    const TotalApplications = await Applications.aggregate([
      {
        $match: {
          $and: [
            { employerId: employerID },
            {
              createdAt: {
                $gte: currDate,
                $lte: nextDate,
              },
            },
          ],
        },
      },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    if (!TotalApplications) {
      res.status("400").send("Employer Applications Not found");
      return;
    } else {
      res.send(TotalApplications);
    }
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const eachJobApplications = async (req, res) => {
  const employerID = mongoose.Types.ObjectId(req.params.id);
  const dateYear = req.params.year;
  let currDate, nextDate;
  if (dateYear === "1990") {
    console.log("Current Year ", dateYear);
    currDate = new Date(1990, 0, 1);
    nextDate = new Date();
  } else {
    console.log("Not Current Year ", dateYear);
    currDate = new Date(dateYear, 0, 1);
    nextDate = new Date(dateYear, 11, 31);
  }
  console.log("Aggregation Year ", currDate.toString());
  console.log("Next Aggregation Year ", nextDate.toString());
  console.log("Req.params", employerID);
  try {
    const TotalApplications = await Applications.aggregate([
      {
        $match: {
          $and: [
            { employerId: employerID },
            {
              createdAt: {
                $gte: currDate,
                $lte: nextDate,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: { jobId: "$jobId", status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (!TotalApplications) {
      res.status("400").send("Employer Applications Not found");
      return;
    } else {
      // Process the aggregate output
      const jobObj = { jobTitle: "", applied: 0, rejected: 0, selected: 0 };
      let processedResult = [];
      let jobIds = [];
      for (let i = 0; i < TotalApplications.length; i++) {
        if (!jobIds.find((ele) => ele.equals(TotalApplications[i]._id.jobId))) {
          const jobinfo = await Jobs.findById(TotalApplications[i]._id.jobId);
          let jobObj = {
            jobId: TotalApplications[i]._id.jobId,
            jobTitle: jobinfo.jobTitle,
            applied: 0,
            rejected: 0,
            selected: 0,
          };
          jobIds.push(TotalApplications[i]._id.jobId);
          processedResult.push(jobObj);
          console.log("Inside Loop JobIds == > ", jobIds);
          console.log(
            "Inside Loop TotalApplications == > ",
            TotalApplications[i]._id.jobId
          );
        }
      }
      console.log("processedResult == > ", processedResult);
      console.log("JobIds == > ", jobIds);
      for (let i = 0; i < TotalApplications.length; i++) {
        for (let j = 0; j < processedResult.length; j++) {
          if (processedResult[j].jobId.equals(TotalApplications[i]._id.jobId)) {
            if (TotalApplications[i]._id.status === "applied") {
              processedResult[j].applied += TotalApplications[i].count;
            }
            if (TotalApplications[i]._id.status === "Rejected") {
              processedResult[j].rejected += TotalApplications[i].count;
            }
            if (TotalApplications[i]._id.status === "Selected") {
              processedResult[j].selected += TotalApplications[i].count;
            }
          }
        }
      }

      res.send(processedResult);
    }
  } catch (error) {
    console.log("Error in aggregation ", error);
    res.status(500).send("Database error");
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobApplicants,
  jobApplications,
  eachJobApplications,
  updateJobApplication
};
