const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { userDataDb, userTokenDb } = require("../data-access");

const makeCreateUser = require("./create-user");
const createUser = makeCreateUser({
  userDataDb,
  bcrypt,
  Joi,
});

const makeGetUser = require("./get-user");
const getUser = makeGetUser({ userDataDb, Joi });

const makeGetAllUser = require("./get-all-user");
const getAllUser = makeGetAllUser({ userDataDb });

const makeDeleteUser = require("./delete-user");
const deleteUser = makeDeleteUser({
  userDataDb,
  Joi,
});

const makeUpdateUser = require("./update-user");
const updateUser = makeUpdateUser({
  userDataDb,
  bcrypt,
  Joi,
});

//login
const makeSendEmail = require("./send-email");
const sendEmail = makeSendEmail({ nodemailer, Joi });

const makeLoginUser = require("./login-user");
const loginUser = makeLoginUser({
  userTokenDb,
  userDataDb,
  sendEmail,
  jwt,
  bcrypt,
  Joi,
});

module.exports = {
  createUser,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
  loginUser,
};
