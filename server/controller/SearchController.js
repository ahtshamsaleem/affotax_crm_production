const Clientdb = require("../model/Client/client");
const Jobsdb = require("../model/Jobs/jobs");
const LeadDb = require("../model/Leads/Leads");
const ProposalsDb = require("../model/Proposals/Proposals");
const Salesdb = require("../model/Sales/Sales");
const Ticketsdb = require("../model/Tickets/Tickets");

exports.getAllValues = async (req, res) => {
    try{
        
        const clients = await Clientdb.find({ isActive: true });
        const jobs = await Jobsdb.find({ subscription : null }).populate('client_id');
        const subscription = await Jobsdb.find({ subscription: { $ne: null } }).populate('client_id');
        const tickets = await Ticketsdb.find().populate('client_id');
        const leads = await LeadDb.find();
        const proposals = await ProposalsDb.find();
        const sales = await Salesdb.find().populate('client_id');

        var response = {
            clients,
            jobs,
            subscription,
            tickets,
            leads,
            proposals,
            sales
        }
    
        res.json(response);

    } catch (err) {
        console.log(err.message)
        res.status(200).json({
            message: "Failed"
          })
    }
}