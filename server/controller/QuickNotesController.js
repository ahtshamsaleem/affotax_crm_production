const QuickNotesDb = require("../model/QuickNotes/QuickNotes")

exports.GetAllQuickNotes = async (req, res) => {

    const userId = req.user._id

    const quickTasks = await QuickNotesDb.find({user_id: userId});

    res.status(200).json({
        quickTasks: quickTasks
    })
}

exports.AddOneQuickNote = async (req, res) => {

    const userId = req.user._id

    await QuickNotesDb.create({
        id: req.body.id,
        taskName: req.body.taskName,
        user_id: userId
    }).then(
        res.status(200).json({
            message: "Quick Task Created Successfully"
        })
    )
}

exports.CheckOneQuickNote = async (req, res) => {

    await QuickNotesDb.findOneAndDelete({id: req.params.id}).then(
        res.status(200).json({
            message: "Quick Task Completed Successfully"
        })
    )
}