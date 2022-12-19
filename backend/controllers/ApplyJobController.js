const Application = require("../Models/ApplicationModel");
const User = require("../Models/UserModel");
const kafka = require("../kafka/client");

const postJob = async (req, res) => {

    kafka.make_request('apply_job', req.body, (err, results) => {
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

module.exports = { postJob }