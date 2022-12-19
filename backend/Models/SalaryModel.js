const mongoose = require("mongoose");

const salarySchema = mongoose.Schema(
  {
    // salaryId: {
    //     type: String,
    //     required: true
    // },
    companyName: {
      type: String,
    },
    // employerId: {
    //     type: String
    // },
    // userId: {
    //     type: String
    // },
    isWorking: {
      type: Boolean,
    },
    endDate: {
      type: Date,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
    },
    currentPay: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
    },
    benifits: {
      type: String,
    },
  },
  { timestamps: true }
);

const Salaries = mongoose.model("Salaries", salarySchema);
module.exports = Salaries;
