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

const makeRevokePermission = require("./revoke-permission");

const sandbox = sinon.createSandbox();

const employeeRolesDb = {
  isRoleExistById: () => {},
  revokePermission: () => {},
};

let isRoleExistByIdStub;
let revokePermissionStub;

BeforeAll(() => {
  isRoleExistByIdStub = sandbox.stub(employeeRolesDb, "isRoleExistById");
  revokePermissionStub = sandbox.stub(employeeRolesDb, "revokePermission");
});

Before(() => {
  isRoleExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "70f0c59a-d467-471a-9579-59627972af74") {
      return false;
    }
  });

  revokePermissionStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    return "Revoked permission successfully";
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Revoke Permission Details id:{string} to delete permission", (id) => {
  this.id = id || undefined;
});
When("Try to Revoke Permission", async () => {
  const revokePermission = makeRevokePermission({ employeeRolesDb, Joi });
  try {
    this.result = await revokePermission({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while revoking permissions',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then("It will revoke permission message: {string}", (message) => {
  expect(message).to.be.eql("Revoked permission successfully");
});
