/* 
@ POST
/api/users/signup
User Signup Route
 */
const User = require("../Models/UserModel");
const Employer = require("../Models/EmployerModel");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/mysqldb");

const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email) {
    return res.status(404).send("email is required");
  }
  if (!password) {
    return res.status(404).send("password is required");
  }
  if (role === -1) {
    return res.status(404).send("role is required");
  }
  console.log("req data", email, password, role);
  pool.getConnection(async (err, conn) => {
    if (err) {
      res.status(500).send("Error occurred!");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      conn.query(
        "INSERT INTO users (email, password, role) VALUES (?,?,?)",
        [email, hashedPassword, role],
        (error, insertResult) => {
          if (error) {
            return res.status(500).json({
              msg: error,
            });
          }
          console.log(insertResult,"===")
          if (role === 0) {
            createMongoUser(req, res, insertResult.insertId);
          } else {
            createMongoEmployer(req, res, insertResult.insertId);
          }
          conn.release();
        }
      );
    }
  });
};

// get the data from request body which is in json and put it in variables called user and password
const createMongoUser = async (req, res, insertId) => {
  const { email, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).send("User already exists");
  } else {
    console.log("in id", insertId)
    const user = await User.create({
      userId: insertId,
      email,
    });
    if (user) {
      console.log("Created!");
      res.status(200).json({ role: role });
    } else {
      res.status(500).send("database error");
      throw new Error("Database error: Please try again later. ");
    }
  }
};

const createMongoEmployer = async (req, res, id) => {
  const { email, role } = req.body;
  const employerExists = await Employer.findOne({
    employerEmail: email,
  });
  if (employerExists) {
    console.log("Employer exists");
    res.status("400").send("Error");
  } else {
    const employer = await Employer.create({
      employerID: id,
      employerEmail: email,
    });

    if (employer) {
      console.log("Created!");
      res.status(201).json({
        employerID: id,
        role: role,
        employerEmail: email,
      });
    } else {
      res.status("400");
      throw new Error("400 Bad Request: Please try again later. ");
    }
  }
};

module.exports = createUser;
