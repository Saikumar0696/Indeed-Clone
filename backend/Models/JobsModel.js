const mongoose = require("mongoose");
const jobsSchema = mongoose.Schema({
  // jobId: {
  //   type: Number,
  //   required: true,
  // },
  jobTitle: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  employerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  jobType: {
    type: String,
    required: true,
  },
  isRemote: {
    type: Boolean,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobDescription: {
    compensation: {
      type: Number,
      required: true,
    },
    responsibilites: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: String,
      required: true,
    },
  },
  jobLocation: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = Jobs;
