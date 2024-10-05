const Clientdb = require("../model/Client/client")
const Goalsdb = require("../model/Goals/Goals")
const Jobsdb = require("../model/Jobs/jobs")
const LeadDb = require("../model/Leads/Leads")
const Userdb = require("../model/Users/Users")

exports.addGoal = async (req, res) => {
    try{

        const startDate = new Date(req.body.formData.startDate)
        const endDate = new Date(req.body.formData.endDate)
        
        await Goalsdb.create({
            subject: req.body.formData.subject,
            achievement: req.body.formData.achievement,
            startDate: startDate != 'Invalid Date' ? startDate : null,
            endDate: endDate != 'Invalid Date' ? endDate : null,
            goalType: req.body.formData.goalType,
            jobHolder: req.body.formData.jobHolder
            
        })

        res.status(200).json({message: "Success"})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}

exports.editGoal = async (req, res) => {
    try{

        const idd = req.params.id

        const startDate = new Date(req.body.formData.startDate)
        const endDate = new Date(req.body.formData.endDate)
        
        await Goalsdb.findByIdAndUpdate( idd,  {
            subject: req.body.formData.subject,
            achievement: req.body.formData.achievement,
            startDate: startDate != 'Invalid Date' ? startDate : null,
            endDate: endDate != 'Invalid Date' ? endDate : null,
            goalType: req.body.formData.goalType,
            jobHolder: req.body.formData.jobHolder
        })

        res.status(200).json({message: "Success"})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}

exports.getAllGoal = async (req, res) => {
    try{

        const goalsFinalData = [];
        var goalsPreData = []
        var users = [];

        const userId = req.user._id
        const User_Cur = await Userdb.findById(userId).populate('role_id');

        if( User_Cur.role_id.name === 'Admin'){
            goalsPreData = await Goalsdb.find();
            const users_all = await Userdb.find().populate('role_id');
            users = users_all.filter((user) => {
                return user.role_id && user.role_id.pages.some((page) => {
                    return page.name === 'Goals Page' && page.isChecked;
                });
            });
        }else{
            goalsPreData = await Goalsdb.find({jobHolder: User_Cur.name});
            users = await Userdb.find({_id: User_Cur._id});
        }


        const clientsPreData = await Clientdb.find();
        const departmentsPreData = await Jobsdb.find();
        const LeadsPreData = await LeadDb.find();

        goalsPreData.forEach((goal)=>{
            const startDate = new Date(goal.startDate);
            const endDate = new Date(goal.endDate);

            var jobholderVal = ""
            if(goal.jobHolder){
                jobholderVal = goal.jobHolder;
            }

            if(goal.goalType === 'Increase Clients'){
                const filteredClients = clientsPreData.filter((obj) =>{
                    if (obj.book_start_date){
                        const bookStartDate = new Date(obj.book_start_date);
                        return bookStartDate >= startDate && bookStartDate <= endDate;
                    }
                    return false;
                })


                const noOfClients = filteredClients.length;
                const percentage = ((+noOfClients / +goal.achievement) * 100).toFixed(0)


                goalsFinalData.push({
                    _id: goal._id,
                    subject: goal.subject,
                    achievement: goal.achievement,
                    startDate: goal.startDate,
                    endDate: goal.endDate,
                    goalType: goal.goalType,
                    __v: goal.__v,
                    percentage,
                    jobHolder: jobholderVal,
                    achievedValue: noOfClients
                })

            }

            if(goal.goalType === 'Increase Fee'){

                const filteredClientsId = []
                var totalFee = 0;
                
                clientsPreData.forEach((obj) =>{
                    if (obj.book_start_date){
                        const bookStartDate = new Date(obj.book_start_date);
                        if(bookStartDate >= startDate && bookStartDate <= endDate){
                            filteredClientsId.push(obj._id.toString())
                        };
                    }
                })


                departmentsPreData.forEach((obj)=>{
                    if(filteredClientsId.includes(obj.client_id.toString())){
                        totalFee = totalFee + +obj.fee
                    }
                })

                const percentage = ((+totalFee / +goal.achievement) * 100).toFixed(0)


                goalsFinalData.push({
                    _id: goal._id,
                    subject: goal.subject,
                    achievement: goal.achievement,
                    startDate: goal.startDate,
                    endDate: goal.endDate,
                    goalType: goal.goalType,
                    __v: goal.__v,
                    percentage,
                    jobHolder: jobholderVal,
                    achievedValue: totalFee
                })

            }

            if(goal.goalType === 'Increase Leads'){

                const filteredLeads = LeadsPreData.filter((obj) =>{
                    if (obj.createDate){
                        const createDate = new Date(obj.createDate);
                        return createDate >= startDate && createDate <= endDate;
                    }
                    return false;
                })


                const noOfLeads = filteredLeads.length;
                const percentage = ((+noOfLeads / +goal.achievement) * 100).toFixed(0)


                goalsFinalData.push({
                    _id: goal._id,
                    subject: goal.subject,
                    achievement: goal.achievement,
                    startDate: goal.startDate,
                    endDate: goal.endDate,
                    goalType: goal.goalType,
                    __v: goal.__v,
                    percentage,
                    jobHolder: jobholderVal,
                    achievedValue: noOfLeads
                })

            }

            if(goal.goalType === 'Leads Won'){

                const filteredLeads = LeadsPreData.filter((obj) =>{
                    if (obj.createDate){
                        const createDate = new Date(obj.createDate);
                        return createDate >= startDate && createDate <= endDate && obj.status === "Won";
                    }
                    return false;
                })


                const noOfLeadsWon = filteredLeads.length;
                const percentage = ((+noOfLeadsWon / +goal.achievement) * 100).toFixed(0)


                goalsFinalData.push({
                    _id: goal._id,
                    subject: goal.subject,
                    achievement: goal.achievement,
                    startDate: goal.startDate,
                    endDate: goal.endDate,
                    goalType: goal.goalType,
                    __v: goal.__v,
                    percentage,
                    jobHolder: jobholderVal,
                    achievedValue: noOfLeadsWon
                })

            }
        })

        



        res.status(200).json({message: "Success", data: goalsFinalData, users: users})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}

exports.DeleteGoal = async (req, res) => {
    
    try{
        const goalId = req.params.id;
        await Goalsdb.findByIdAndDelete(goalId);
            
          res.json({
            message: "Success",
            data: "Goal Deleted Successfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Fail",
            data: err.message
        })
    }

}