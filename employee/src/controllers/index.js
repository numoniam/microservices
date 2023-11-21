const {
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
} = require("../use-cases");

const makeCreateEmployeeAction = require("./create-employee");
const createEmployeeAction = makeCreateEmployeeAction({ createEmployee });

const makeGetEmployeeAction = require("./get-employee");
const getEmployeeAction = makeGetEmployeeAction({ getEmployee });

const makeDeleteEmployeeAction = require("./delete-employee");
const deleteEmployeeAction = makeDeleteEmployeeAction({ deleteEmployee });

const makeUpdateEmployeeAction = require("./update-employee");
const updateEmployeeAction = makeUpdateEmployeeAction({ updateEmployee });

const makeGetAllEmployeeAction = require("./get-all-employee");
const getAllEmployeeAction = makeGetAllEmployeeAction({ getAllEmployee });

const makeGetAllEmployeeByIdAction = require("./get-all-employee-by-id");
const getAllEmployeeByIdAction = makeGetAllEmployeeByIdAction({
  getAllEmployeeById,
});

//role
const makeCreateRoleAction = require("./create-role");
const createRoleAction = makeCreateRoleAction({ createRole });

const makeGetRoleAction = require("./get-role");
const getRoleAction = makeGetRoleAction({ getRole });

const makeGetAllRoleAction = require("./get-all-role");
const getAllRoleAction = makeGetAllRoleAction({ getAllRole });

const makeDeleteRoleAction = require("./delete-role");
const deleteRoleAction = makeDeleteRoleAction({ deleteRole });

const makeUpdateRoleAction = require("./update-role");
const updateRoleAction = makeUpdateRoleAction({ updateRole });

//assign role
const makeAssignRoleAction = require("./assign-role");
const assignRoleAction = makeAssignRoleAction({ assignRole });

const makeRevokePermissionAction = require("./revoke-permission");
const revokePermissionAction = makeRevokePermissionAction({ revokePermission });

const makeGetAssignRoleAction = require("./get-assign-role");
const getAssignRoleAction = makeGetAssignRoleAction({ getAssignRole });

module.exports = {
  createEmployeeAction,
  getEmployeeAction,
  deleteEmployeeAction,
  updateEmployeeAction,
  getAllEmployeeAction,
  getAllEmployeeByIdAction,
  createRoleAction,
  getRoleAction,
  getAllRoleAction,
  deleteRoleAction,
  updateRoleAction,
  assignRoleAction,
  revokePermissionAction,
  getAssignRoleAction,
};
