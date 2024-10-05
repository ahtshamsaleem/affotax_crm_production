const Userdb = require("../model/Users/Users");

exports.GetMyListPreData = async (req, res) => {

    const users_all = await Userdb.find({ isActive: true });

    res.status(200).json({
        message: "Successful",
        users: users_all
    })
}