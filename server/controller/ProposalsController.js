const Clientdb = require("../model/Client/client");
const ProposalsDb = require("../model/Proposals/Proposals");
const Userdb = require("../model/Users/Users");

exports.addProposals = async (req, res) => {
    
    try{

        await ProposalsDb.create({
            jobHolder: req.body.formData.jobHolder,
            clientName: req.body.formData.clientName,
            companyName: req.body.formData.companyName,
            subject: req.body.formData.subject,
            detailedSubject: req.body.formData.detailedSubject,
            date: req.body.formData.date,
            deadline: req.body.formData.deadline,
            jobDate: req.body.formData.jobDate,
            note: req.body.formData.note,
            source: req.body.formData.source,
            status: req.body.formData.status
        });
            
          res.json({
            message: "Success",
            data: "Proposal Added Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.editProposals = async (req, res) => {
    
    try{
        const id = req.params.id;
        await ProposalsDb.findByIdAndUpdate( id, {
            jobHolder: req.body.formData.jobHolder,
            clientName: req.body.formData.clientName,
            companyName: req.body.formData.companyName,
            subject: req.body.formData.subject,
            detailedSubject: req.body.formData.detailedSubject,
            date: req.body.formData.date,
            deadline: req.body.formData.deadline,
            jobDate: req.body.formData.jobDate,
            note: req.body.formData.note,
            source: req.body.formData.source,
            status: req.body.formData.status
        });
            
          res.json({
            message: "Success",
            data: "Proposal Edited Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.copyProposals = async (req, res) => {
    
    try{
        const id = req.params.id;
        const proposal = await ProposalsDb.findOne({_id: id});

        await ProposalsDb.create({
            jobHolder: proposal.jobHolder,
            clientName: proposal.clientName,
            companyName: proposal.companyName,
            date: proposal.date,
            deadline: proposal.deadline,
            jobDate: proposal.jobDate,
            note: proposal.note,
            source: proposal.source,
            status: "Proposal"
        });
            
          res.json({
            message: "Success",
            data: "Proposal Copied Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.deleteProposals = async (req, res) => {
    
    try{
        const id = req.params.id;
        await ProposalsDb.findByIdAndDelete( id );
            
          res.json({
            message: "Success",
            data: "Proposal Deleted Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}

exports.getAllProposals = async (req, res) => {
    try {

        var proposals = [];
        const userId = req.user._id;
        const User = await Userdb.findById(userId).populate('role_id');

        if( User.role_id.name === 'Admin'){
            proposals = await ProposalsDb.find();
        }else{
            proposals = await ProposalsDb.find({jobHolder: User.name });

        }




        const clients = await Clientdb.find();
        const users_all = await Userdb.find().populate("role_id");
        const employees = users_all.filter((user) => {
            return user.role_id && user.role_id.pages.some((page) => {
              return page.name === 'Proposals Page' && page.isChecked;
            });
          });

        const resp = {
            proposals,
            employees,
            clients
        }

        res.status(200).json({
            message: "Success",
            data: resp
        })

        
    } catch (err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }
}