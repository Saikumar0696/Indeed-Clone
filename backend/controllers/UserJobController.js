const Jobs = require("../Models/JobsModel");
exports.getAllUserJobs = async (req, res) => {
  const { employerID, page, limit } = req.query;
  const length = await Jobs.find({ employerID }).countDocuments();
  console.log(length);

  console.log("Req.params", employerID); // get the data from request body which is in json and put it in variables called user and password

  console.log(page, limit);
  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;

  const employerExists = await Jobs.findOne({ employerID: employerID });
  if (!employerExists) {
    res.status("400").send("Employer Not found");
  } else {
    const getJobs = await Jobs.find({ employerID })
      .limit(parseInt(limit))
      .skip(startIndex);

    if (!getJobs) {
      res.status("200").send("Jobs Not found");
    }
    res.send({ jobs: getJobs, length });
  }
};
