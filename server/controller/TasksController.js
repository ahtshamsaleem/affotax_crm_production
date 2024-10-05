const Notidb = require("../model/Notifications/Notifications");
const MainTaskdb = require("../model/Tasks/MainTasks");
const ProjectDb = require("../model/Tasks/Projects");
const ProjectNameDb = require("../model/Tasks/ProjNameForList");
const SubTaskdb = require("../model/Tasks/SubTasks");
const Userdb = require("../model/Users/Users");

exports.addProjectName = async (req, res) => {
  try {
    const usersList = req.body.usersList;
    ProjectNameDb.create({
      name: req.body.name,
      users_list: usersList,
    }).then(
      res.status(200).json({
        message: "Project Name Created Successfully",
      })
    );
  } catch (err) {
    console.error("Error:", err);
  }
};

exports.editProjectName = async (req, res) => {
  try {
    const projId = req.params.id;
    const usersList = req.body.usersList;

    await ProjectNameDb.findByIdAndUpdate(projId, {
      name: req.body.name,
      users_list: usersList,
    });

    res.status(200).json({
      message: "Project Name Edited Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Some Error Occured",
    });
  }
};

exports.deleteProjectName = async (req, res) => {
  try {
    const id = req.params.id;
    ProjectNameDb.deleteOne({
      _id: id,
    }).then(
      res.status(200).json({
        message: "Project Name Deleted Successfully",
      })
    );
  } catch (err) {
    console.error("Error:", err);
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const User = await Userdb.findById(userId).populate("role_id");
    var projects = [];
    if (User.role_id.name === "Admin") {
      projects = await ProjectDb.find()
        .populate("Jobholder_id")
        .populate("projectname_id")
        .populate("lead")
        .populate({ path: "task_id", populate: { path: "subtasks_id" } });
    } else {
      projects = await ProjectDb.find()
        .populate("Jobholder_id")
        .populate({
          path: "projectname_id",
          match: { users_list: { $in: [userId] } },
        })
        .populate("lead")
        .populate({
          path: "task_id",
          populate: { path: "subtasks_id" },
        });

      projects = projects.filter((project) => project.projectname_id !== null);
    }

    // const projects = await ProjectDb.find().populate('Jobholder_id').populate('projectname_id').populate('lead').populate({path: 'task_id',populate: {path: 'subtasks_id'},});
    const users_all = await Userdb.find({ isActive: true }).populate("role_id");
    const projectNames = await ProjectNameDb.find();

    const users = users_all.filter((user) => {
      return (
        user.role_id &&
        user.role_id.pages.some((page) => {
          return page.name === "Tasks Page" && page.isChecked;
        })
      );
    });

    const curUser = req.user.name;

    res.status(200).json({
      projects: projects,
      projectNames: projectNames,
      users: users,
      curUser: curUser,
      userRole: User.role_id.name,
    });
  } catch (err) {
    console.error("Error:", err);
  }

  // const projects = await ProjectDb.find().populate({path: 'task_id',populate: {path: 'subtasks_id'},});
};

// -------------Create Task--------->
exports.AddOneProject = async (req, res) => {
  const startDate = new Date(req.body.formData.startDate);
  const deadline = new Date(req.body.formData.deadline);
  const jobDate = new Date(req.body.formData.job_date);
  try {
    const newProject = await ProjectDb.create({
      projectname_id: req.body.formData.name,
      description: req.body.formData.description,
      startDate: startDate != "Invalid Date" ? startDate : null,
      deadline: deadline != "Invalid Date" ? deadline : null,
      Jobholder_id: req.body.formData.Jobholder_id,
      status: req.body.formData.status,
      job_date: jobDate != "Invalid Date" ? jobDate : null,
      hrs: req.body.formData.hrs,
      lead: req.body.formData.lead,
    });

    res.status(200).json({
      message: "Project Added Successfully",
      task: newProject,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.EditOneProject = async (req, res) => {
  const id = req.params.id;
  const curUserName = req.user.name;

  const startDate = new Date(req.body.startDate);
  const deadline = new Date(req.body.deadline);
  const jobDate = new Date(req.body.job_date);

  var data = {
    projectname_id: req.body.name,
    description: req.body.description,
    startDate: startDate != "Invalid Date" ? startDate : null,
    deadline: deadline != "Invalid Date" ? deadline : null,
    status: req.body.status,
    job_date: jobDate != "Invalid Date" ? jobDate : null,
    hrs: req.body.hrs,
    notes: req.body.notes,
  };

  if (req.body.lead && req.body.lead !== "") {
    console.log(req.body.lead);
    data.lead = req.body.lead;
  }
  if (req.body.Jobholder_id && req.body.Jobholder_id !== "") {
    data.Jobholder_id = req.body.Jobholder_id;

    const prevTask = await ProjectDb.findById(id);
    const projectNameAll = await ProjectNameDb.findById(req.body.name);
    const prevUserId = prevTask.Jobholder_id;
    const projectName = projectNameAll.name;

    if (prevUserId !== req.body.Jobholder_id) {
      await Notidb.create({
        title: "New Task Assigned",
        description: `${curUserName} Assigned you a new Task of "${projectName}"`,
        redirectLink: `/tasks?task_id=${id}`,
        user_id: req.body.Jobholder_id,
      });
    }
  }

  await ProjectDb.findOneAndUpdate({ _id: id }, data).then(
    res.status(200).json({
      message: "Task Updated Successfully",
    })
  );
};

exports.getOneProjectWithTasks = async (req, res) => {
  const id = params.id;

  const projects = await ProjectDb.find({ _id: id }).populate({
    path: "task_id",
    populate: { path: "subtasks_id" },
  });

  res.status(200).json({
    projects: projects,
  });
};

exports.deleteOneProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await ProjectDb.findOne({ _id: id });

    if (!project) {
      return res.status(404).json({ message: "Main task not found" });
    }

    const mainTaskIds = project.task_id;
    const mainTask = await MainTaskdb.find({ _id: { $in: mainTaskIds } });

    for (let i = 0; i < mainTask.length; i++) {
      const subTasksIds = mainTask[i].subtasks_id;
      await SubTaskdb.deleteMany({ _id: { $in: subTasksIds } });
    }

    await MainTaskdb.deleteMany({ _id: { $in: mainTaskIds } });
    await ProjectDb.deleteOne({ _id: id });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete main task" });
  }
};

exports.addMainTaskOfProject = async (req, res) => {
  const id = req.params.id;

  const mainTask = await MainTaskdb.create({ name: req.body.name });
  const projects = await ProjectDb.findOneAndUpdate(
    { _id: id },
    { $push: { task_id: mainTask._id } }
  );

  res.status(200).json({
    message: "Added Successfully",
  });
};

exports.deleteMainTaskOfProject = async (req, res) => {
  try {
    const id = req.params.id;
    const mainTask = await MainTaskdb.findOne({ _id: id });
    if (!mainTask) {
      return res.status(404).json({ message: "Main task not found" });
    }
    const subTasksId = mainTask.subtasks_id;
    await SubTaskdb.deleteMany({ _id: { $in: subTasksId } });
    await MainTaskdb.deleteOne({ _id: id });
    await ProjectDb.updateOne(
      { _id: req.body.mtId },
      { $pull: { task_id: id } }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete main task" });
  }
};

exports.addSubTaskofMainTask = async (req, res) => {
  const id = req.params.id;

  const subTask = await SubTaskdb.create({
    name: req.body.name,
    isCompleted: false,
  });
  const mainTask = await MainTaskdb.findOneAndUpdate(
    { _id: id },
    { $push: { subtasks_id: subTask._id } }
  );

  res.status(200).json({
    message: "Added Successfully",
  });
};

exports.updateSubTaskofMainTask = async (req, res) => {
  const id = req.params.id;

  const projects = await SubTaskdb.findOneAndUpdate(
    { _id: id },
    { isCompleted: req.body.isChecked }
  );

  res.status(200).json({
    message: "Updated Successfully",
  });
};

exports.deleteSubTaskofMainTask = async (req, res) => {
  const id = req.params.id;

  await SubTaskdb.deleteOne({ _id: id });
  await MainTaskdb.findByIdAndUpdate(
    req.body.mtId,
    { $pull: { subtasks_id: id } },
    { new: true }
  );

  res.status(200).json({
    message: "Deleted Successfully",
  });
};

exports.CopyOneProject = async (req, res) => {
  const id = req.params.id;

  const projects = await ProjectDb.findById(id);

  const CopiedTaskDoc = await ProjectDb.create({
    projectname_id: projects.projectname_id,
    startDate: projects.startDate,
    deadline: projects.deadline,
    Jobholder_id: projects.Jobholder_id,
    status: projects.status,
    hrs: projects.hrs,
    job_date: projects.job_date,
    lead: projects.lead,
  });

  console.log(CopiedTaskDoc)
  res.status(200).json({
    message: "Project Added Successfully",
    id: CopiedTaskDoc._id
  })
};
