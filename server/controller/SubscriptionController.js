const Jobsdb = require("../model/Jobs/jobs")

exports.editSubscription = async (req, res) => {
    
    const year_end = new Date(req.body.year_end)
    const job_deadline = new Date(req.body.job_deadline)
    const work_deadline = new Date(req.body.work_deadline)
    

      try{
  
      Jobsdb.find
            

      } catch (err) {

        res.status(401).json({
          message: "Data not successful Updated",
          error: err,
        })

      }
  }
