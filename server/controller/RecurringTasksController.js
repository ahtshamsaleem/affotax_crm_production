const RecurringTasksDb = require("../model/RecurringTasks/RecurringTasks");
const RecurringTasksCategoryDb = require("../model/RecurringTasks/RecurringTasksCategory");

exports.GetAllRecurringTasks = async (req, res) => {

    const userId = req.user._id

    const recurringTasksCategory = await RecurringTasksCategoryDb.find({user_id: userId}).populate('recurring_task_id');
    const recurringTasks = await RecurringTasksDb.find();

    res.status(200).json({
      recurringTasksCategory: recurringTasksCategory,
      recurringTasks: recurringTasks
    })
}

exports.AddOneRecurringTasksCategory = async (req, res) => {

    const userId = req.user._id

    await RecurringTasksCategoryDb.create({
        id: req.body.id,
        name: req.body.name,
        user_id: userId
    }).then(
        res.status(200).json({
            message: "Recurring Task Category Created Successfully"
        })
    )
}

exports.AddOneRecurringTasks = async (req, res) => {

  try {
    const task = await RecurringTasksDb.create({
      id: req.body.id,
      task: req.body.task,
      category_id: req.body.category_id
    });

    await RecurringTasksCategoryDb.findOneAndUpdate({id: req.body.category_id}, { $push: { recurring_task_id: task._id } }, { new: true });

    res.status(200).json({
      message: "Recurring Task Added Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while adding Recurring Task",
      error: error.message
    });
  }
};

exports.CheckOneRecurringTasks = async (req, res) => {
  

  RecurringTasksDb.findOne({ id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!doc) {
      return res.status(404).send("Document not found");
    }
  
   const isChecked = doc.isChecked; // Extract isChecked value from document


  RecurringTasksDb.findOneAndUpdate(
    { id: req.params.id },
    { isChecked: !isChecked },
    { new: true } // this option returns the updated document
)
.then(updatedDoc => {
    if (!updatedDoc) {
        return res.status(404).json({
            message: "Quick Task not found"
        });
    }
    res.status(200).json({
        message: "Quick Task Completed Successfully",
        data: updatedDoc // you can include the updated document in the response
    });
})
.catch(error => {
    res.status(500).json({
        message: "Error occurred while updating Quick Task",
        error: error.message // you can include the error message in the response
    });
});
})
}


exports.DeleteOneRecurringTasks = async (req, res) => {
  
  RecurringTasksDb.findOneAndDelete(
    { id: req.params.id }
)
.then(updatedDoc => {
    if (!updatedDoc) {
        return res.status(404).json({
            message: "Quick Task not found"
        });
    }
    res.status(200).json({
        message: "Quick Task Completed Successfully",
        data: updatedDoc // you can include the updated document in the response
    });
})
.catch(error => {
    res.status(500).json({
        message: "Error occurred while updating Quick Task",
        error: error.message // you can include the error message in the response
    });
});
}

exports.DeleteOneTaskCategory = async (req, res) => {
  
  RecurringTasksCategoryDb.findOneAndDelete(
    { id: req.params.id }
)
.then(updatedDoc => {
    if (!updatedDoc) {
        return res.status(404).json({
            message: "Task Category not found"
        });
    }
    res.status(200).json({
        message: "Task Category Deleted Successfully",
        data: updatedDoc // you can include the updated document in the response
    });
})
.catch(error => {
    res.status(500).json({
        message: "Error occurred while Deleting Task Category",
        error: error.message // you can include the error message in the response
    });
});
}