const axios = require("axios");
const serviceEndpoints=require("../config/service-endpoints")

const makeGetEmployeeDetail = require("./get-employee-detail");
const getEmployeeDetail = makeGetEmployeeDetail({ axios,serviceEndpoints });

const makeCreateDefaultEmployee = require("./create-default-employee");
const createDefaultEmployee = makeCreateDefaultEmployee({ axios,serviceEndpoints });

module.exports = {
  getEmployeeDetail,
  createDefaultEmployee,
};
