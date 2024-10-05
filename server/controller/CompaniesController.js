const Companiessdb = require("../model/Companies/Companies")



exports.addCompany = async (req, res) => {
    try{

        await Companiessdb.create({
            name: req.body.formData.name,
            address: req.body.formData.address,
        })

        res.status(200).json({message: "Success"})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}


exports.editCompany = async (req, res) => {
    try{
        const id = req.params.id;
        await Companiessdb.findByIdAndUpdate( id, {
            name: req.body.formData.name,
            address: req.body.formData.address,
        })

        res.status(200).json({message: "Success"})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}

exports.deleteCompany = async (req, res) => {
    try{
        const id = req.params.id;
        await Companiessdb.findByIdAndDelete( id )

        res.status(200).json({message: "Success"})
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}


exports.getAllCompanies = async (req, res) => {
    try{

        const companies = await Companiessdb.find();

        const resp = {
            companies
        }

        res.status(200).json(resp)
        
        
    } catch (err) {
        console.error('Error:', err)
        res.status(400).json({message: "Failed"})
    }
}