const Joi = require("@hapi/joi");
const { getCompanyId, getCompanyDetail } = require("../internal-service-call");

const { employeeDb, allRolesDb, employeeRolesDb } = require("../data-access");

const makeCreateEmployee = require("./create-employee");
const createEmployee = makeCreateEmployee({
  employeeDb,
  allRolesDb,
  employeeRolesDb,
  getCompanyId,
  Joi,
});

const makeGetEmployee = require("./get-employee");
const getEmployee = makeGetEmployee({
  employeeDb,
  getCompanyDetail,
  Joi,
});

const makeDeleteEmployee = require("./delete-employee");
const deleteEmployee = makeDeleteEmployee({
  employeeDb,
  Joi,
});

const makeUpdateEmployee = require("./update-employee");
const updateEmployee = makeUpdateEmployee({
  employeeDb,
  Joi,
});

const makeGetAllEmployee = require("./get-all-employee");
const getAllEmployee = makeGetAllEmployee({
  employeeDb,
});

const makeGetAllEmployeeById = require("./get-all-employee-by-id");
const getAllEmployeeById = makeGetAllEmployeeById({
  employeeDb,
  Joi,
});

const makeDeleteEmployeeById = require("./delete-employee-by-id");
const deleteEmployeeById = makeDeleteEmployeeById({
  employeeDb,
  Joi,
});

//role
const makeCreateRole = require("./create-role");
const createRole = makeCreateRole({
  allRolesDb,
  Joi,
});

const makeGetRole = require("./get-role");
const getRole = makeGetRole({ allRolesDb, Joi });

const makeGetAllRole = require("./get-all-role");
const getAllRole = makeGetAllRole({ allRolesDb });

const makeDeleteRole = require("./delete-role");
const deleteRole = makeDeleteRole({
  allRolesDb,
  Joi,
});

const makeUpdateRole = require("./update-role");
const updateRole = makeUpdateRole({
  allRolesDb,
  Joi,
});

const makeDeleteRoleById = require("./delete-role-by-id");
const deleteRoleById = makeDeleteRoleById({
  allRolesDb,
  Joi,
});

//assign role
const makeAssignRole = require("./assign-role");
const assignRole = makeAssignRole({
  employeeRolesDb,
  Joi,
});

const makeRevokePermission = require("./revoke-permission");
const revokePermission = makeRevokePermission({
  employeeRolesDb,
  Joi,
});

const makeGetAssignRole = require("./get-assign-role"); //for middeware
const getAssignRole = makeGetAssignRole({
  employeeRolesDb,
  Joi,
});

//permissions
const makeValidatePermission = require("./validate-permission");
const validatePermission = makeValidatePermission({
  employeeRolesDb,
  allRolesDb,
  Joi,
});

module.exports = {
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getAllEmployee,
  getAllEmployeeById,
  createRole,
  getRole,
  getAllRole,
  deleteRole,
  updateRole,
  assignRole,
  revokePermission,
  getAssignRole,
  validatePermission,
  deleteRoleById,
  deleteEmployeeById
};
