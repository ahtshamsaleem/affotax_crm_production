const Pagedb = require("../model/RolesPermissions/Page");
const Permissionsdb = require("../model/RolesPermissions/Permissions");
const Roledb = require("../model/RolesPermissions/Roles");
const Userdb = require("../model/Users/Users");

exports.getRolesPreData = async (req, res) => {

    const roles = await Roledb.find();
    const Pages = await Pagedb.find();
    const permissions = await Permissionsdb.find();
    
    res.status(200).json({
        roles: roles,
        pages: Pages,
        permissions: permissions
    })

}


exports.addNewRole = async (req, res) => {

    // console.log(req.body)
    
    await Roledb.create({
        name: req.body.name,
    }).then(
        res.status(200).json({
            message: "Roles Created Successfully"
        })
    )
    
}

exports.deleteOneRole = async (req, res) => {

    try {
        const id = req.params.id;
        
        await Roledb.deleteOne({ _id: id });
        
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete role" });
    }

}

exports.addPermissions = async (req, res) => {

    await Roledb.findOneAndUpdate({_id: req.body.id},{
        pages: req.body.pages,
    }).then(
        res.status(200).json({
            message: "Pages Added Successfully"
        })
    )
    
}

exports.getUserRoles = async (req, res) => {

    const roles = await Roledb.find();
    const users = await Userdb.find({isActive: true}).populate('role_id');
    res.status(200).json({
        roles: roles,
        users: users,
    })

}

exports.assignRoleToUser = async (req, res) => {

    console.log(req.body)

    const roles = await Userdb.findOneAndUpdate({_id: req.body._id}, {
        role_id: req.body.role_id
    });
    


    res.status(200).json({
        message: "Successfully Updated"
    })

}