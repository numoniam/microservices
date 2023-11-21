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

const makeGetAssignRole = require("./get-assign-role");

const sandbox = sinon.createSandbox();

const employeeRolesDb = {
  getAssignRole: () => {},
};
BeforeAll(() => {
  getAssignRoleStub = sandbox.stub(employeeRolesDb, "getAssignRole");
});

Before(() => {
  getAssignRoleStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return false;
    } else {
      return [
        {
          id: "894764f3-d5f0-46ef-9e88-61471aec0656",
          role_id: "c669428a-cbc2-4a14-b67a-bcede9d9b118",
          employee_id: "653ff526-17ef-4a71-9a1a-94227d9e43df",
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

Given("Role Details id:{string} to get assign role", (id) => {
  this.id = id || undefined;
});
When("Try to get assign role", async () => {
  const getAssignRole = makeGetAssignRole({ employeeRolesDb, Joi });
  try {
    this.result = await getAssignRole({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while geting assign role', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then(
  'Then It will get assign role data with message: "{string}"',
  (message) => {
    expect(this.result).deep.equal(JSON.parse(message));
  }
);
