const Clientdb = require("../model/Client/client");
const Jobsdb = require("../model/Jobs/jobs");
const Timerdb = require("../model/Timer/Timer");
const Userdb = require("../model/Users/Users");

exports.getTimerState = async (req, res) => {
  try {
    const [timer, clients, jobs] = await Promise.all([
      Timerdb.findOne({ user_id: req.user._id, endTime: {$eq: undefined} })
        .select("startTime endTime notes client_id job_id task_id")
        .lean()
        .sort({ _id: -1 }),
      Clientdb.find().select("_id company_name"),
      Jobsdb.find().select("_id job_name client_id"),
    ]);

    if (timer && timer.startTime && !timer.endTime) {
      const [client, job] = await Promise.all([
        timer.client_id
          ? Clientdb.findById(timer.client_id).select("_id company_name").lean()
          : null,
        timer.job_id
          ? Jobsdb.findById(timer.job_id).select("_id job_name").lean()
          : null,
      ]);

      const clients = await Clientdb.find();
      const jobs = await Jobsdb.find();

      const selClient = {
        value: client ? client._id : "",
        label: client ? client.company_name : "",
      };

      const selDepartment = {
        value: job ? job._id : "",
        label: job ? job.job_name : "",
      };

      res.status(200).send({
        status: "success",
        message: "running",
        startTime: timer.startTime,
        time_id: timer._id,
        job_id: timer.job_id,
        user: req.user.name,
        note: timer.notes || "",
        client: selClient ? selClient : "",
        department: selDepartment ? selDepartment : "",
        clients: clients ,
        jobs: jobs ,
        task_id:timer.task_id
      });
    } else {
      res.status(200).send({
        message: "not_running",
        user: req.user.name,
        clients: clients,
        jobs: jobs,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.startStopTimer = async (req, res) => {
  const time_now = new Date();
  const test_timer = await Timerdb.findOne({
    user_id: req.user._id,
    type: "Timer",
    endTime: {$eq: undefined}
  }).sort({ _id: -1 });
  console.log(test_timer)
  if (
    test_timer &&
    test_timer.startTime !== undefined &&
    test_timer.endTime === undefined
  ) {
    console.log('Timer should stop', req.body)
    await Timerdb.findOneAndUpdate(
      { _id: req.body.data._id },
      {
        endTime: time_now,
        notes: req.body.data.notes,
      }
    ).then(
      res.status(200).json({
        message: "saved",
      })
    );
  } else {
    console.log(req.body)

    if(!req.body.data.job_id && !req.body.data.task_id){
      console.log('inside the if block starttimer validation failed')
      return res.status(422).json({message: 'Validation Failed to start the timer! '})
    }
    // const anyRunningTimer = await Timerdb.findOne({ user_id: req.user._id, endTime: {$eq: undefined} })
    // console.log(anyRunningTimer, 'anyrunning timer here')
    // if(anyRunningTimer) {
    //   return res.status(422).json({message: ' Failed to start the timer! Timer is already running'})
    // }
    else {
      const timer = await Timerdb.create({
        startTime: time_now,
        notes: req.body.data.notes,
        client_id: req.body.data.client_id,
        job_id: req.body.data.job_id,
        departmentName: req.body.data.jobName,
        user_id: req.user._id,
        type: "Timer",
        task_id: req.body.data.task_id
      });

      res.status(200).json({ message: "started", time_id: timer._id })
    }


    
  }
};

exports.getTimerReport = async (req, res) => {
  try {
    const [timer, users, clients, jobs] = await Promise.all([
      Timerdb.find({ endTime: { $ne: undefined } })
        .populate("client_id", "client_name")
        .populate("job_id", "job_name")
        // .populate('user_id', 'name')
        .populate({
          path: 'task_id',
          populate : {
            path : 'projectname_id'
          }
        })
        .populate({
          path: "user_id",
          select: "name",
          match: { isActive: true },
        })
        .lean(),
      Userdb.find({ isActive: true }, "name").lean(),
      Clientdb.find({}, "company_name").lean(),
      Jobsdb.find({}, "job_name client_id").lean(),
    ]);

    const curUser = req.user.name;


    //console.log(timer)


    const response = {
      timer,
      users,
      clients,
      jobs,
      curUser,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addManualEntry = async (req, res) => {
  try {
    const dateString = req.body.data.date;
    const startTimeString = req.body.data.start_time;
    const EndTimeString = req.body.data.end_time;

    // Combine date and time strings
    const startDateTimeString = dateString + "T" + startTimeString + ":00";
    const endDateTimeString = dateString + "T" + EndTimeString + ":00";

    // Create a new date object with the combined date and time
    const startDateObj = new Date(startDateTimeString);
    const EndDateObj = new Date(endDateTimeString);

    await Timerdb.create({
      startTime: startDateObj,
      endTime: EndDateObj,
      notes: req.body.data.note,
      client_id: req.body.data.client_id && req.body.data.client_id,
      job_id: req.body.data.job_id && req.body.data.job_id,
      user_id: req.user._id,
      type: "Manual",
    }).then(
      res.status(200).json({
        message: "Entry Saved Successfully",
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteOneEntry = async (req, res) => {
  try {
    const id = req.params.id;

    await Timerdb.findByIdAndDelete(id).then(
      res.status(200).json({
        message: "Entry Deleted Successfully",
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
