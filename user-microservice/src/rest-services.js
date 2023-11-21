const express = require("express");
const router = express.Router();
const userControllers = require("./controllers");

router
  .post("/user", userControllers.createUserAction)
  .get("/user/:id", userControllers.getUserAction)
  .get("/user", userControllers.getAllUserAction)
  .delete("/user/:id", userControllers.deleteUserAction)
  .patch("/user/:id", userControllers.updateUserAction)
  .post("/login",userControllers.loginUserAction)

module.exports = router;
