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

const makeGetUser = require("./get-user");

const sandbox = sinon.createSandbox();

const userDataDb = {
  getUser: () => {},
};

let getUserStub;

BeforeAll(() => {
  getUserStub = sandbox.stub(userDataDb, "getUser");
});

Before(() => {
  getUserStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return false;
    } else {
      return [
        {
          id: "6db6fa98-5489-4252-81c6-60c69337eb97",
          name: "savan",
          email: "savan@gmail.com",
        },
      ];
    }
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("User Details id:{string} to get user", (id) => {
  this.id = id || undefined;
});

When("Try to get user", async () => {
  const getUser = makeGetUser({ userDataDb, Joi });
  try {
    this.result = await getUser({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while geting user', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('Then It will get user with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
