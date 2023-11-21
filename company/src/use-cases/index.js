const Joi = require("@hapi/joi");
const { Kafka } = require("kafkajs");
const {
  getEmployeeDetail,
  createDefaultEmployee,
} = require("../internal-service-call");
const { companyDb } = require("../data-access");

const makeCreateCompany = require("./create-company");
const createCompany = makeCreateCompany({
  companyDb,
  createDefaultEmployee,
  Joi,
});

const makeGetAllCompany = require("./get-all-company");
const getAllCompany = makeGetAllCompany({ companyDb });

const makeGetCompany = require("./get-company");
const getCompany = makeGetCompany({ companyDb, getEmployeeDetail, Joi });

const makeDeleteCompany = require("./delete-company");
const deleteCompany = makeDeleteCompany({ companyDb, Kafka, Joi });

const makeUpdateCompany = require("./update-company");
const updateCompany = makeUpdateCompany({ companyDb, Joi });

const makeGetCompanyByName = require("./get-company-by-name");
const getCompanyByName = makeGetCompanyByName({ companyDb, Joi });

module.exports = {
  createCompany,
  getAllCompany,
  getCompany,
  deleteCompany,
  updateCompany,
  getCompanyByName,
};
