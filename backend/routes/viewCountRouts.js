const express = require('express')
const Employer = require('../Models/EmployerModel')
const router = express.Router()

router.get('/addViewCount/:employerID', async (req, res) => {
    const employerID = req.params.employerID
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    let day = d.getDay()
    const dayName = days[day]
    const employerViewsByDay = await Employer.findOne({ _id: employerID, 'views.day': dayName })
    //var result = employerViewsByDay.views.count
    //result = result+1

    if (employerViewsByDay) {
        const result = employerViewsByDay.views.filter(x => x.day == dayName)
        let count = result[0].count
        count = count + 1
        //console.log(count)
        const employer = await Employer.updateOne({ _id: employerID, 'views.day': dayName },
            {
                $set: {
                    "views.$.count": count

                }
            }

        )
        //employer.views.count = result
        if(employer)
            res.send("View Count incremented")

        //const result = await employer.views.
    }
    else {
        const employer = await Employer.updateOne({ _id: employerID },
            {
                $push: {
                    "views":
                    {
                        day: dayName,
                        count: 1

                    }
                }
            },

            { safe: true, upsert: true }
        )
        if (employer) {
            res.send("View Count incremented")
        }

    }


})


router.get('/getViewCount/:employerID', async (req, res) => {
    const employerID = req.params.employerID
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    let day = d.getDay()
    const dayName = days[day]
    const employerViewsByDay = await Employer.findOne({ employerID: employerID, 'views.day': dayName })
    //var result = employerViewsByDay.views.count
    //result = result+1

    if (employerViewsByDay) {
        const result = employerViewsByDay.views
        res.status(200).send(result)
    }
    else {
        
            res.status(404).send("Employer's Id not found")
        

    }


})

router.get('/getTopViewCountsByDay/:day', async (req, res) => {
    const day = req.params.day
    /*var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    //let day = d.getDay()
    const dayName = days[day]*/
    
    let employerViewsByDay = await Employer.find({'views.day':day}, ["companyName", "views"] ).sort({'views.count':-1}).limit(10);
    

    if (employerViewsByDay) {
        res.status(200).send(employerViewsByDay)
    }
    else {
        
            res.status(404).send("Employer's Id not found")
        

    }


})



module.exports = router