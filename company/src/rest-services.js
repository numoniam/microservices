const express = require("express");
const router = express.Router();
const companyController = require("./controllers");

router
  .get("/company", companyController.getAllCompanyAction)
  .post("/company", companyController.createCompanyAction)
  .get("/company/:id", companyController.getCompanyAction)
  .delete("/company/:id", companyController.deleteCompanyAction)
  .patch("/company/:id", companyController.updateCompanyAction)
  .get("/company/detail/:name",companyController.getCompanyByNameAction)

module.exports = router;
