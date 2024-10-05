const Timerdb = require("../model/Timer/Timer")

exports.getAttendanceSheet = async (req, res) => {
    try{


        const result = await Timerdb.find({ endTime: { $ne: undefined } }).populate({ path: 'user_id', match: { isActive: true } });

        res.json(result)

        
    } catch (err) {
        console.error('Error:', err)
    }
}