const {
  createUser,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../use-cases");

const makeCreateUserAction = require("./create-user");
const createUserAction = makeCreateUserAction({ createUser });

const makeGetUserAction = require("./get-user");
const getUserAction = makeGetUserAction({ getUser });

const makeGetAllUserAction = require("./get-all-user");
const getAllUserAction = makeGetAllUserAction({ getAllUser });

const makeDeleteUserAction = require("./delete-user");
const deleteUserAction = makeDeleteUserAction({ deleteUser });

const makeUpdateUserAction = require("./update-user");
const updateUserAction = makeUpdateUserAction({ updateUser });

const makeLoginUserAction = require("./login-user");
const loginUserAction = makeLoginUserAction({ loginUser });

module.exports = {
  createUserAction,
  getUserAction,
  getAllUserAction,
  deleteUserAction,
  updateUserAction,
  loginUserAction,
};
