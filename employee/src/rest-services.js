const express = require("express");
const router = express.Router();
const {validateMiddlewar}=require("./middleware")
const employeeController = require("./controllers");

router
  .post("/employee",(req,res,next) => validateMiddlewar({req,res,next,permissions:"employee.create"}), employeeController.createEmployeeAction)
  .get("/employee/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"employee.get"}), employeeController.getEmployeeAction) //employee ID
  .delete("/employee/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"employee.delete"}), employeeController.deleteEmployeeAction) //employee ID
  .patch("/employee/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"employee.update"}), employeeController.updateEmployeeAction) //employee ID
  .get("/employee",(req,res,next) => validateMiddlewar({req,res,next,permissions:"employee.get"}), employeeController.getAllEmployeeAction) 
  .get("/employee/detail/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"employee.get"}), employeeController.getAllEmployeeByIdAction) //company ID
  .post("/role/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"role.create"}), employeeController.createRoleAction) //company ID
  .get("/role/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"role.get"}), employeeController.getRoleAction) //role ID
  .get("/role",(req,res,next) => validateMiddlewar({req,res,next,permissions:"role.get"}), employeeController.getAllRoleAction) 
  .delete("/role/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"role.delete"}), employeeController.deleteRoleAction) //role ID
  .patch("/role/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"role.update"}), employeeController.updateRoleAction)  //role ID
  .post("/assign/role",(req,res,next) => validateMiddlewar({req,res,next,permissions:"assign.create"}), employeeController.assignRoleAction) //pass roleId and employeeId in body
  .delete("/permission/revoke/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"assign.delete"}),employeeController.revokePermissionAction) //role ID
  .get("/assign/role/:id",(req,res,next) => validateMiddlewar({req,res,next,permissions:"assign.get"}),employeeController.getAssignRoleAction) //employee ID
  .get("/public/employee/detail/:id",(req,res,next) => validateMiddlewar({req,res,next,public:true,permissions:"employee.get"}), employeeController.getAllEmployeeByIdAction) //company ID
  .post("/public/employee",(req,res,next) => validateMiddlewar({req,res,next,public:true,permissions:"employee.create"}), employeeController.createEmployeeAction)//public api for internal call
  



module.exports = router;
