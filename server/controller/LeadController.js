const LeadDb = require("../model/Leads/Leads");
const Userdb = require("../model/Users/Users");

exports.getAllLeads = async (req, res) => {
    const leads = await LeadDb.find().sort({_id: -1}).populate('manager_id').populate("Jobholder_id");
     
        if (!leads) {
            return res.status(400).json({
                message: "Some Error, Please try again later",
            })
        }

    const users_all = await Userdb.find({ isActive: true }).populate('role_id');

        const users = users_all.filter((user) => {
            return user.role_id && user.role_id.pages.some((page) => {
              return page.name === 'Leads Page' && page.isChecked;
            });
          });

        var response = {
            leads: leads,
            users: users
        }

        res.json(response);
}


exports.addUpdateLead = async (req, res) => {

    const time_now = new Date();
    const followUpDate = req.body.data.followUpDate ? new Date(req.body.data.followUpDate) : null
    const jobDate = req.body.data.jobDate ? new Date(req.body.data.jobDate) : null
    const createDate = req.body.data.createDate ? new Date(req.body.data.createDate) : null

    if(req.body.data._id === "New"){
        //Add New Lead
        await LeadDb.create({
            companyName: req.body.data.companyName && req.body.data.companyName,
            clientName:  req.body.data.clientName && req.body.data.clientName,
            department: req.body.data.department && req.body.data.department,
            source: req.body.data.source && req.body.data.source,
            brand: req.body.data.brand && req.body.data.brand,
            partner: req.body.data.partner && req.body.data.partner,
            createDate: time_now,
            followUpDate: followUpDate ? followUpDate != 'Invalid Date' && followUpDate : time_now,
            // manager_id: req.body.data.manager_id && req.body.data.manager_id,
            Jobholder_id: req.body.data.Jobholder_id ? req.body.data.Jobholder_id : null,
            jobDate: jobDate ? jobDate != 'Invalid Date' && jobDate : time_now,
            email: req.body.data.email && req.body.data.email,
            note: req.body.data.note && req.body.data.note,
            stage: req.body.data.stage && req.body.data.stage,
        }).then(
            res.status(200).json({
                message: "Data Added Successfully"
            })
        )

    }else{
        //Edit Lead
        await LeadDb.findOneAndUpdate({_id: req.body.data._id},{
            companyName: req.body.data.companyName && req.body.data.companyName,
            clientName:  req.body.data.clientName && req.body.data.clientName,
            department: req.body.data.department && req.body.data.department,
            source: req.body.data.source && req.body.data.source,
            brand: req.body.data.brand && req.body.data.brand,
            partner: req.body.data.partner && req.body.data.partner,
            followUpDate: followUpDate && followUpDate != 'Invalid Date' && followUpDate,
            createDate: createDate && createDate != 'Invalid Date' && createDate,
            // manager_id: req.body.data.manager_id && req.body.data.manager_id,
            Jobholder_id: req.body.data.Jobholder_id ? req.body.data.Jobholder_id : null,
            jobDate: jobDate ? jobDate != 'Invalid Date' && jobDate : time_now,
            email: req.body.data.email && req.body.data.email,
            note: req.body.data.note && req.body.data.note,
            stage: req.body.data.stage && req.body.data.stage,
        }).then(
            res.status(200).json({
                message: "Data Updated Successfully"
            })
        )
    }
}


exports.deleteOneLead = async (req, res) => {

    const id = req.params.id;

    

      LeadDb.deleteOne({ _id: id.toString() }, (err, product) => {
        if (err) {
          console.log(err);
          res.json({message:"Failed to delete"});
        }
        
        res.json({message:"Successfully Deleted"});
        
});
}

exports.WonLost = async (req, res) => {

    const id = req.params.id;

    

      LeadDb.findOneAndUpdate({ _id: id.toString() }, { $set: { 
        status: req.body.status,
        reason: req.body.review
     } },
      { new: true }, (err, product) => {
          if (err) {
            console.log(err);
            res.json({message:"Failed to Change Status"});
          }
          
          res.json({message:"Successfully Changed Status"});
          
      });
}


exports.CopyOneLead = async (req, res) => {

    const id = req.params.id

    const Lead = await LeadDb.findById( id );

    await LeadDb.create({
        companyName: "",
        clientName:  "",
        department: Lead && Lead.department,
        source: Lead && Lead.source,
        brand: Lead && Lead.brand,
        partner: Lead && Lead.partner,
        createDate: Lead && Lead.createDate,
        followUpDate: Lead && Lead.followUpDate,
        // manager_id: req.body.data.manager_id && req.body.data.manager_id,
        jobDate: Lead && Lead.jobDate,
        email: Lead && Lead.email,
        note: Lead && Lead.note,
        stage: Lead && Lead.stage,
    }).then(
        res.status(200).json({
            message: "Project Copied Successfully"
        })
    )
}