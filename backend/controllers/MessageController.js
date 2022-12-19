const Messages = require('../Models/MessageModel')
const Employer = require('../Models/EmployerModel')
const kafka = require("../kafka/client")

/*
    @ Post
    /indeed/messages/send-message
    Employer Send Message to Job Seeker
 */
const sendMessage = async (req, res) => {
    kafka.make_request('send_message', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "400") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })
}

const replyMessage = async (req, res) => {
    kafka.make_request('reply_message', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "400") {
            res.status(404).send("Resource not found")
          } else {
            res.status(200).send(results)
          }
    })

    // console.log(req.body)
    // try{
    //     const getMessage = await Messages.findById({_id: req.body._id})
    //     getMessage.messages.push({
    //         from: req.body.message.from,
    //         to: req.body.message.to,
    //         messageText: req.body.message.messageText
    //     })
    //     await getMessage.save()
    //     if(getMessage){
    //         res.status(200).send(getMessage)
    //     }
    //     else{
    //         res.status(400).send('Unable to reply for the message!')
    //     }
    // }
    // catch(error){
    //     console.log(error)
    //     res.status(500);
    //     throw new Error('500 Internal Server Error');
    // }
}


const getMessages = async (req, res) => {
    kafka.make_request('get_message', req.query, (err, results) => {
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

const getDistinctEmployer = async (req, res) => {
    kafka.make_request('get_distinct_employer', req.query, (err, results) => {
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

module.exports = { sendMessage, getMessages, replyMessage, getDistinctEmployer };