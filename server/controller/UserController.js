const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var Userdb = require("../model/Users/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jobsdb = require("../model/Jobs/jobs");
const Clientdb = require("../model/Client/client");
const UserListdb = require("../model/userList/userList");

//create and save new user

exports.createUser = async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    phone_number,
    emergenyc_contact,
    start_date,
    address,
  } = req.body.data;


  console.log(req.body)


  var hashed_password = "";

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    const saltRounds = 10;
    await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hash) => {
        hashed_password = hash;
      })
      .catch((err) => console.error(err.message));

    await Userdb.create({
      name: name,
      email: email,
      password: hashed_password,
      username: username,
      phone_number: phone_number,
      emergenyc_contact: emergenyc_contact,
      start_date: start_date,
      address: address,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: "User not successful created",
      error: err.message,
    });
  }
};

exports.inactiveUser = async (req, res) => {
  const id = req.params.id;
  await Userdb.findByIdAndUpdate(id, {
    end_date: req.body.end_date,
    isActive: false,
  });
  res.status(200).json({
    message: "Operation Successfull",
  });
};

exports.editUser = async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    phone_number,
    emergenyc_contact,
    start_date,
    address,
  } = req.body.data;

  var hashed_password = "";
  const id = req.params.id;

  if (password) {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password less than 6 characters" });
    }
  }
  try {
    if (password) {
      const saltRounds = 10;
      await bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          console.log("Salt: ", salt);
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          hashed_password = hash;
        })
        .catch((err) => console.error(err.message));
    }

    await Userdb.findByIdAndUpdate(id, {
      name: name,
      email: email,
      password: hashed_password && hashed_password,
      username: username,
      phone_number: phone_number,
      emergenyc_contact: emergenyc_contact,
      start_date: start_date,
      address: address,
      // role_id: role_id,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully Updated",
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not successful Updated",
      error: err,
    });
  }
};

exports.getOneUser = async (req, res) => {
  const id = req.params.id;

  try {
    await Userdb.findById(id).then((user) =>
      res.status(200).json({
        user: user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not found",
      error: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id.toString();

  try {
    const userId = new ObjectId(id);
    await Userdb.findByIdAndDelete(userId).then((user) => {
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          message: "User successfully deleted",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  try {
    const user = await Userdb.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      verified = bcrypt.compareSync(password, user.password);

      if (verified) {
        const payload = {
          user: user,
        };

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(payload, jwtSecretKey);

        res.status(200).json({
          message: "Login successful",
          Token: token,
          user,
        });
      } else {
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
      //   error: "Please Try Again Later",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Userdb.find();
    const userArr = await Promise.all(
      users.map(async (user) => {
        const {
          _id: id,
          name: uName,
          isActive,
          email,
          phone_number,
          username,
          start_date,
          address,
          emergenyc_contact,
        } = user;
        const clientIds = await Jobsdb.distinct("client_id", {
          manager_id: user._id,
        });
        const jobs = await Jobsdb.find({ manager_id: user._id });
        const noOfClients = clientIds.length;
        const totalHrs = parseInt(
          jobs.reduce((sum, job) => +sum + +job.hours, 0)
        );
        const totalFee = parseInt(
          jobs.reduce((sum, job) => +sum + +job.fee, 0)
        );
        return {
          _id: id,
          name: uName,
          isActive: isActive,
          email,
          phone_number,
          username,
          start_date,
          address,
          emergenyc_contact,
          noOfClients,
          totalHrs,
          totalFee,
        };
      })
    );
    res.json(userArr);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserRoles = (req, res) => {
  const id = req.user._id;

  Userdb.findOne({ _id: id })
    .populate("role_id")
    .exec(async function (err, user) {
      if (err) {
        throw err;
      }
      const userList = await UserListdb.findOne({ userId: id });
      return res.status(200).json({
        users: user,
        userList,
      });
    });
};
