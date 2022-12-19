const User = require("../Models/UserModel");
const { auth } = require("../config/passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { pool } = require("../config/mysqldb");
const Employer = require("../Models/EmployerModel");

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(404).send("email is required");
  }
  if (!password) {
    return res.status(404).send("password is required");
  }
  console.log(email);
  pool.getConnection(async (err, conn) => {
    if (err) {
      res.send("Error occured");
    } else {
      conn.query(
        "SELECT * FROM users where email=?",
        [email],
        async (error, result) => {
          if (error) {
            return res.status(500).json({
              msg: error,
            });
          }
          if (result[0]) {
            let isValid = false;
            let results = {};
            try {
              isValid = await bcrypt.compare(password, result[0].password);
            } catch (error) {
              console.log(error);
            }
            if (isValid) {
              const payload = { _id: result[0].userId, email: result[0].email };
              const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: 1008000,
              });
              results["JWT"] = token;
              results["email"] = result[0].email;
              results["role"] = result[0].role;
              if (result[0].role === 0) {
                console.log("---", result[0].userId)
                const moongoresults = await User.findOne({
                  userId: result[0].userId,
                });
                results["userId"] = moongoresults._id;
                res.status(200).send(results);
              } else {
                const moongoresults = await Employer.findOne({
                  employerID: result[0].userId,
                });
                results["userId"] = moongoresults._id;
                res.status(200).send(results);
              }
            } else {
              res.status(401).send("Unauthorized");
            }
          } else {
            res.status(404).send("Resource not found");
          }
          conn.release();
        }
      );
    }
  });
};

module.exports = loginUser;
