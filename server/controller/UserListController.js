const UserListdb = require("../model/userList/userList");

exports.addEditUserList = async (req, res) => {
    try {
        const userId = req.user._id
        const PrevData = await UserListdb.findOne({userId});

        if(!PrevData){
            const data = await UserListdb.create({
                userId: userId,
                userList: req.body.updatedValue
            });
        } else {
            const data = await UserListdb.findByIdAndUpdate( PrevData._id, {
                userList: req.body.updatedValue
            });
        }

      res.status(200).send('Success');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };