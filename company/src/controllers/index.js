const {
  createCompany,
  getAllCompany,
  getCompany,
  deleteCompany,
  updateCompany,
  getCompanyByName,
} = require("../use-cases");

const makeCreateCompanyAction = require("./create-company");
const createCompanyAction = makeCreateCompanyAction({ createCompany });

const makeGetAllCompanyAction = require("./get-all-company");
const getAllCompanyAction = makeGetAllCompanyAction({ getAllCompany });

const makeGetCompanyAction = require("./get-company");
const getCompanyAction = makeGetCompanyAction({ getCompany });

const makeDeleteCompanyAction = require("./delete-company");
const deleteCompanyAction = makeDeleteCompanyAction({ deleteCompany });

const makeUpdateCompanyAction = require("./update-company");
const updateCompanyAction = makeUpdateCompanyAction({ updateCompany });

const makeGetCompanyByNameAction = require("./get-company-by-name");
const getCompanyByNameAction = makeGetCompanyByNameAction({ getCompanyByName });

module.exports = {
  createCompanyAction,
  getAllCompanyAction,
  getCompanyAction,
  deleteCompanyAction,
  updateCompanyAction,
  getCompanyByNameAction,
};
