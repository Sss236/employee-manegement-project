const Employee = require('./models/employee');
const HR = require('./models/hr');

exports.verifyHR = async (req, res, next) => {
    try {
        const user = await HR.findById(req.userId); //dentify the logged-in user via req.userId
        if (user) {
            next();
        } else {
            res.status(403).send('Access Denied: Only HR personnel can perform this action.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
