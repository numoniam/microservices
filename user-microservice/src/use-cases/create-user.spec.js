const {
  Given,
  When,
  Then,
  BeforeAll,
  Before,
  After,
  AfterAll,
} = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("@hapi/joi");

const makeCreateUser = require("./create-user");

const sandbox = sinon.createSandbox();

const userDataDb = {
  isUserExistByEmail: () => {},
  createUser: () => {},
};

const bcrypt = {
  hash: () => {},
};

let isUserExistByEmailStub;
let hashPasswordStub;
let createUserStub;

BeforeAll(() => {
  isUserExistByEmailStub = sandbox.stub(userDataDb, "isUserExistByEmail");
  hashPasswordStub = sandbox.stub(bcrypt, "hash");
  createUserStub = sandbox.stub(userDataDb, "createUser");
});

Before(() => {
  isUserExistByEmailStub.callsFake((args) => {
    expect(args).deep.equal({
      email: this.email,
    });
    if (args.email === "savanghori12@gmail.com") {
      return true;
    } else {
      return false;
    }
  });

  hashPasswordStub.callsFake((args) => {
    //   expect(args).deep.equal({
    //     password: this.password,
    // saltRounds : this.saltRounds
    //   });
    return "$2b$10$nT1W9.KFKgd8YcjFL2NekOR6EAbUDHb.xxFW5bEL3paJo6ToaC7Ce";
  });

  createUserStub.callsFake((args) => {
    expect(args).deep.equal({
      name: this.name,
      email: this.email,
      password: "$2b$10$nT1W9.KFKgd8YcjFL2NekOR6EAbUDHb.xxFW5bEL3paJo6ToaC7Ce",
    });
    return { id: "ac56a6ce-0551-4b83-b613-32ce296e28ff" };
  });
});

After(() => {
  this.name = undefined;
  this.email = undefined;
  this.password = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Company details name:{string},email:{string},password:{string} to create new user",
  (name, email, password) => {
    this.name = name || undefined;
    this.email = email || undefined;
    this.password = password || undefined;
  }
);

When("Try to create new user", async () => {
  const createUser = makeCreateUser({ userDataDb, bcrypt, Joi });
  try {
    this.result = await createUser({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while creating new user', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('Then It will create new user with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
