const Jobs = require('../../../Models/JobsModel')
const Employer = require('../../../Models/EmployerModel')

const handle_request = async(msg, callback) => {
    const job = msg.job
    const location = msg.location
    const page = parseInt(msg.page)
    const limit = parseInt(msg.limit)
    if (job && location) {
        const query = {$or: [
            {
                $and: [
                    {"jobTitle": job},
                    {"jobLocation.city": location}
                ]
            },
            {
                $and: [
                    {"companyName": job},
                    {"jobLocation.city": location}
                ]
            }
        ]}
        paginationFunc(page, limit, query, callback)
    } else if (job) {
        const query = {$or: [
            {
                "jobTitle": job
            },
            {
                "companyName": job
            }
        ]}
        paginationFunc(page, limit, query, callback)
    } else if (location) {
        const query = {"jobLocation.city":location}
        paginationFunc(page, limit, query)
    } else {
        const query = {}
        paginationFunc(page, limit, query, callback)
    }
}

const paginationFunc = async (page, limit, query, callback) => {
    console.log("page & limit : ", page, limit)
    const startIndex = (page - 1) * limit 
    const endIndex = page * limit

    const results = {}
    if (page === 0 && limit === 0) { 
      try {
        results.results = await Jobs.find(query).populate('employerID')
        if (results.results) {
            callback(null, results.results)   
        } else {
            callback(null, "404")
        } 
      } catch (error) {
          console.log(error)
        callback(null, "500")
      }
    } else {
      if (endIndex < await Jobs.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      try {
        results.results = await Jobs.find(query).limit(limit).skip(startIndex).populate('employerID').exec()
        if (results.results) {
            callback(null, results.results)   
        } else {
            callback(null, "404")
        }
        
      } catch (e) {
        callback(null, "500")
      }
    }
}

exports.handle_request = handle_request;