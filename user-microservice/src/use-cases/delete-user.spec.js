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

const makeDeleteUser = require("./delete-user");

const sandbox = sinon.createSandbox();

const userDataDb = {
  isUserExistById: () => {},
  deleteUser: () => {},
};

let isUserExistByIdStub;
let deleteUserStub;

BeforeAll(() => {
  isUserExistByIdStub = sandbox.stub(userDataDb, "isUserExistById");
  deleteUserStub = sandbox.stub(userDataDb, "deleteUser");
});

Before(() => {
  isUserExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return false;
    } else {
      return true;
    }
  });

  deleteUserStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("User Details id:{string} to delete user", (id) => {
  this.id = id || undefined;
});
When("Try to delete user", async () => {
  const deleteUser = makeDeleteUser({ userDataDb, Joi });
  try {
    this.result = await deleteUser({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while deleting user', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("Then It will delete user with message: {string}", (message) => {
  expect(this.result).deep.equal(message);
});
