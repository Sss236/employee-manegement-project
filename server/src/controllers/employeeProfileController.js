const EmployeeProfile = require("../models/employeeProfile");
const EmployeeModel = require("../models/employee");

exports.getAllEmployeeProfiles = async (req, res) => {
  try {
    const employeeProfiles = await EmployeeProfile.find({});
    res.status(200).json(employeeProfiles);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getNotProfiledEmployees = async (req, res, next) => {
  try {
    const notProfiledEmployees = await EmployeeModel.find({ profile: null });
    res.status(200).json(notProfiledEmployees);
  } catch (error) {
    next(error);
  }
};
