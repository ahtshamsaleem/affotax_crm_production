const Pagedb = require("../model/RolesPermissions/Page");

exports.addPageForRole = async (req, res) => {
    try{
        const name = req.params.name;
        await Pagedb.create( {
            name: name
        } )

        res.status(200).json({message: "Success"})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}