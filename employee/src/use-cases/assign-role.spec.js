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

const makeAssignRole = require("./assign-role");

const sandbox = sinon.createSandbox();

const employeeRolesDb = {
  assignRole: () => {},
};

let assignRoleStub;

BeforeAll(() => {
  assignRoleStub = sandbox.stub(employeeRolesDb, "assignRole");
});

Before(() => {
  assignRoleStub.callsFake((args) => {
    expect(args).deep.equal({
      employeeId: this.employeeId,
      roleId: this.roleId,
    });
  });
});

After(() => {
  this.employeeId = undefined;
  this.roleId = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "role details employeeId:{string},roleId:{string} to assign role",
  (employeeId, roleId) => {
    this.employeeId = employeeId || undefined;
    this.roleId = roleId || undefined;
  }
);
When("Try to assign new role to employee", async () => {
  const assignRole = makeAssignRole({ employeeRolesDb, Joi });
  try {
    this.result = await assignRole({
      employeeId: this.employeeId,
      roleId: this.roleId,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while assigning new role to employee',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then("Then It will assign role with message: {string}", (message) => {
  expect(message).to.be.eql("Role assigend successfully");
});
