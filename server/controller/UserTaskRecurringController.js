const ProjectNameDb = require("../model/Tasks/ProjNameForList");
const UserTaskRecurringDb = require("../model/Tasks/UserTaskRecurring");
const Userdb = require("../model/Users/Users");

exports.getAllUserRecurringTasks = async (req, res) => {

    try {

        const userId = req.user._id
        const User = await Userdb.findById(userId).populate('role_id');
        var projects = [];
        if( User.role_id.name === 'Admin'){
            projects = await UserTaskRecurringDb.find().populate('projectname_id');
        }else{
            projects = await UserTaskRecurringDb.find({Jobholder_id: User.name}).populate('projectname_id');
        }
        projects = projects.filter(project => project.projectname_id !== null);

        projects = await Promise.all( projects.map(async (item) => {

          const today = new Date();
          var nextDate = new Date(item.nextUpdate);
          if(!nextDate || nextDate === ""){
            nextDate = new Date();
          }
          const checkDate = new Date(item.dates[0].date);
          var check = false;

          if ( today.setHours(0, 0, 0) >= nextDate.setHours(0, 0, 0) ) {
            check = true;
          }
        
          if(check){
            var nextUpdate = new Date(nextDate);
            if (item.interval === "Daily") {
              nextUpdate.setDate(nextUpdate.getDate() + 1);
            } else if (item.interval === "Weekly") {
              nextUpdate.setDate(nextUpdate.getDate() + 7);
            } else if (item.interval === "Monthly") {
              nextUpdate.setMonth(nextUpdate.getMonth() + 1);
              nextUpdate.setDate(1);
            } else if (item.interval === "Quarterly") {
              nextUpdate.setMonth(nextUpdate.getMonth() + 3);
              nextUpdate.setDate(1);
            }

            const newDate = {
              date: nextDate,
              isCompleted: false,
              notes: ""
            }
            const newItems = [...item.dates, newDate];
        
            // Update the item with the new dates array
            item.dates = newItems;
    
        
            // Update the MongoDB document
            await UserTaskRecurringDb.findByIdAndUpdate(item._id, {nextUpdate , $push: { dates: newDate } } );
          };
          return item;
        })
        )

        // const projects = await ProjectDb.find().populate('Jobholder_id').populate('projectname_id').populate('lead').populate({path: 'task_id',populate: {path: 'subtasks_id'},});
        const users_all = await Userdb.find({ isActive: true }).populate('role_id');
        const projectNames = await ProjectNameDb.find();

        const users = users_all.filter((user) => {
          return user.role_id && user.role_id.pages.some((page) => {
            return page.name === 'Recurring Tasks Page' && page.isChecked;
          });
        });

        const curUser = req.user.name

        res.status(200).json({
            projects: projects,
            projectNames: projectNames,
            users: users,
            curUser: curUser,
            userRole: User.role_id.name
        })
        
      } catch (err) {
        console.error('Error:', err);
      }
}

exports.addOneUserRecurringTasks = async (req, res) => {

    try {

      const today = new Date();

      var nextUpdate = new Date();
      if (req.body.formData.interval === "Daily") {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
      } else if (req.body.formData.interval === "Weekly") {
        nextUpdate.setDate(nextUpdate.getDate() + 7);
      } else if (req.body.formData.interval === "Monthly") {
        nextUpdate.setMonth(nextUpdate.getMonth() + 1);
        nextUpdate.setDate(1);
      } else if (req.body.formData.interval === "Quarterly") {
        nextUpdate.setMonth(nextUpdate.getMonth() + 3);
        nextUpdate.setDate(1);
      }

      const datesObj = [{
        date: today,
        isCompleted: false,
        notes: "",
      }]


      
  
      await UserTaskRecurringDb.create({
          projectname_id: req.body.formData.projectname_id,
          Jobholder: req.body.formData.Jobholder,
          description: req.body.formData.description,
          hrs: req.body.formData.hrs,
          interval: req.body.formData.interval,
          nextUpdate: nextUpdate,
          dates: datesObj,
          
      })

        res.status(200).json({
            message: "Success"
          })
        
      } catch (err) {
        console.error('Error:', err);
      }
}

exports.editOneUserRecurringTasks = async (req, res) => {

    try {

      const id = req.params.id
      const today = new Date()

      const oldData = await UserTaskRecurringDb.findById(id);
      const oldDates = oldData.dates;

      var nextUpdate = " ";

      const previousDate =new Date( oldDates[oldDates.length - 1].date );
      var newDate = new Date( req.body.date );

      if( oldData.interval !== req.body.interval || newDate.toString() !== "Invalid Date" ){
        if( newDate.toString() !== "Invalid Date" ){
          nextUpdate = new Date( newDate );
        } else {
          nextUpdate = new Date( previousDate );
        }
        if (req.body.interval === "Daily") {
          nextUpdate.setDate(nextUpdate.getDate() + 1);
        } else if (req.body.interval === "Weekly") {
          nextUpdate.setDate(nextUpdate.getDate() + 7);
        } else if (req.body.interval === "Monthly") {
          nextUpdate.setMonth(nextUpdate.getMonth() + 1);
        } else if (req.body.interval === "Quarterly") {
          nextUpdate.setMonth(nextUpdate.getMonth() + 3);
        }
      }

      const dates = oldDates.map((item, index) => {

        if(index === oldDates.length - 1 ){
          if( newDate.toString() !== "Invalid Date" ){
            item.date = newDate;
          }
          item.notes = req.body.note;
        }
        return item;
      });
  
      await UserTaskRecurringDb.findByIdAndUpdate(id, {
          projectname_id: req.body.projectname_id,
          Jobholder: req.body.Jobholder,
          description: req.body.description,
          hrs: req.body.hrs,
          interval: req.body.interval,
          nextUpdate: nextUpdate,
          dates: dates
      })

        res.status(200).json({
            message: "Success"
          })
        
      } catch (err) {
        console.error('Error:', err);
      }
}

exports.markCompleteOneUserRecurringTasks = async (req, res) => {

    try {

      const id = req.params.id
      const today = new Date()

      const oldData = await UserTaskRecurringDb.findById(id);
      const oldDates = oldData.dates;

      const dates = oldDates.map((item, index) => {
      
        if (index === oldDates.length - 1) {
          item.isCompleted = req.body.isChecked;
          console.log(item);
        }
      
        return item;
      });
  
      await UserTaskRecurringDb.findByIdAndUpdate(id, {
          dates: dates
      })

        res.status(200).json({
            message: "Success"
          })
        
      } catch (err) {
        console.error('Error:', err);
      }
}

exports.deleteOneUserRecurringTasks = async (req, res) => {

    try {

      const id = req.params.id;
  
      await UserTaskRecurringDb.findByIdAndDelete(id);

        res.status(200).json({
            message: "Success"
          })
        
      } catch (err) {
        console.error('Error:', err);
      }
}

exports.copyOneUserRecurringTasks = async (req, res) => {

    try {

      const id = req.params.id;
      const oldData = await UserTaskRecurringDb.findById(id);

      const today = new Date()

      var nextUpdate = new Date();
      if (oldData.interval === "Daily") {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
      } else if (oldData.interval === "Weekly") {
        nextUpdate.setDate(nextUpdate.getDate() + 7);
      } else if (oldData.interval === "Monthly") {
        nextUpdate.setMonth(nextUpdate.getMonth() + 1);
        nextUpdate.setDate(1);
      } else if (oldData.interval === "Quarterly") {
        nextUpdate.setMonth(nextUpdate.getMonth() + 3);
        nextUpdate.setDate(1);
      }

      const datesObj = [{
        date: today,
        isCompleted: false,
        notes: "",
      }];
  
      await UserTaskRecurringDb.create({
          projectname_id: oldData.projectname_id,
          Jobholder: oldData.Jobholder,
          description: "",
          hrs: oldData.hrs,
          interval: oldData.interval,
          dates: datesObj,
          nextUpdate: nextUpdate
          
      })

        res.status(200).json({
            message: "Success"
          })
        
      } catch (err) {
        console.error('Error:', err);
      }
}