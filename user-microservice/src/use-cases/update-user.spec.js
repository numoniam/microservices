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

const makeUpdateUser = require("./update-user");

const sandbox = sinon.createSandbox();

const userDataDb = {
  isUserExistById: () => {},
  isUserExistByEmail: () => {},
  updateUser: () => {},
};

const bcrypt = {
  hash: () => {},
};

let isUserExistByIdStub;
let isUserExistByEmailStub;
let passwordEncrStub;
let updateUserStub;

BeforeAll(() => {
  isUserExistByIdStub = sandbox.stub(userDataDb, "isUserExistById");
  isUserExistByEmailStub = sandbox.stub(userDataDb, "isUserExistByEmail");
  passwordEncrStub = sandbox.stub(bcrypt, "hash");
  updateUserStub = sandbox.stub(userDataDb, "updateUser");
});

Before(() => {
  isUserExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "5d37e404-490e-4673-b8fa-af69c7b4e6cb") {
      return false;
    } else {
      return true;
    }
  });

  isUserExistByEmailStub.callsFake((args) => {
    expect(args).deep.equal({
      email: this.userUpdateData.email,
    });
    if ((args.name = "savanghori17@gmail.com")) {
      return true;
    } else {
      return;
    }
  });

  passwordEncrStub.callsFake((args) => {
    return "$2b$10$nT1W9.KFKgd8YcjFL2NekOR6EAbUDHb.xxFW5bEL3paJo6ToaC7Ce";
  });

  updateUserStub.callsFake((args) => {
    expect(args).deep.equal({
      userUpdateData: this.userUpdateData,
      id: this.id,
    });
    return "User Data Updated successfully";
  });
});

After(() => {
  this.id = undefined;
  this.userUpdateData = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  'User details id:{string},userUpdateData:"{string}" to update user',
  (id, userUpdateData) => {
    this.id = id || undefined;
    this.userUpdateData = JSON.parse(userUpdateData) || undefined;
  }
);

When("Try to update user", async () => {
  const updateUser = makeUpdateUser({
    userDataDb,
    bcrypt: passwordEncrStub,
    Joi,
  });
  try {
    this.result = await updateUser({
      userUpdateData: this.userUpdateData,
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while updating user', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("It will update user with message: {string}", (message) => {
  expect(message).to.be.eql("User Data Updated successfully");
});
