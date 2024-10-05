const ChartOfAccountsdb = require("../model/ChartOfAccounts/ChartOfAccounts");

exports.getAllChartOfAccounts = async (req, res) => {
    const COA = await ChartOfAccountsdb.find().sort({_id: -1});
     
        if (!COA) {
            return res.status(400).json({
                message: "Some Error, Please try again later",
            })
        }

        var response = {
            COA
        }

        res.json(response);
}

exports.addOneChartOfAccounts = async (req, res) => {
    const COA = await ChartOfAccountsdb.create({
        account_type: req.body.formData.account_type,
        code: req.body.formData.code,
        name: req.body.formData.name
        
    })
     
        if (!COA) {
            return res.status(400).json({
                message: "Some Error, Please try again later",
            })
        }

        res.status(200).json({
            message: "Added Successfully",
        })
}