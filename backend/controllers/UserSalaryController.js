const kafka = require("../kafka/client");

const userSalary = async (req, res) => {
  kafka.make_request("post_salary", req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};
const getUserSalary = async (req, res) => {
  kafka.make_request("get_salary", req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = { userSalary, getUserSalary };
