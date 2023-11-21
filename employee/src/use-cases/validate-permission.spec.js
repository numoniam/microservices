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

const makeValidatePermission = require("./validate-permission");

const sandbox = sinon.createSandbox();

const employeeRolesDb = {
  getAssignRole: () => {},
};
const allRolesDb = {
  getRole: () => {},
};

let getAssignRoleStub;
let getRoleStub;

BeforeAll(() => {
  getAssignRoleStub = sandbox.stub(employeeRolesDb, "getAssignRole");
  getRoleStub = sandbox.stub(allRolesDb, "getRole");
});

Before(() => {
  getAssignRoleStub.callsFake((args) => {
    return true;
  });

  getRoleStub.callsFake((args) => {
    expect(args).deep.equal({});
  });
});

After(() => {
  this.route = undefined;
  this.method = undefined;
  this.employeeId = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Permission details route:{string},method:{string},employeeId:{string} to for validating permissions",
  (route, method, employeeId) => {
    this.route = route || undefined;
    this.method = method || undefined;
    this.employeeId = employeeId || undefined;
  }
);

When("Try to validate permission", async () => {
  const validatePermission = makeValidatePermission({
    employeeRolesDb,
    allRolesDb,
    Joi,
  });
  try {
    this.result = await validatePermission({
      route: this.route,
      method: this.method,
      employeeId: this.employeeId,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while validating permission',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then("It will validate pernmission with message: {string}", (message) => {
  expect(message).to.be.eql("validate permission successfully");
});
