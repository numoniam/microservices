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

const makeCreateRole = require("./create-role");

const sandbox = sinon.createSandbox();

const allRolesDb = {
  createRole: () => {},
};

let createRoleStub;
BeforeAll(() => {
  createRoleStub = sandbox.stub(allRolesDb, "createRole");
});

Before(() => {
  createRoleStub.callsFake((args) => {
    expect(args).deep.equal({
      role: this.role,
      id: this.id,
      permissions: this.permissions,
    });
  });
});

After(() => {
  this.role = undefined;
  this.id = undefined;
  this.permissions = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Role details id:{string},role:{string},permissions:{string} to create new role",
  (id, role, permissions) => {
    this.id = id || undefined;
    this.role = role || undefined;
    this.permissions = JSON.parse(permissions) || undefined;
  }
);
When("Try to create new role", async () => {
  const createRole = makeCreateRole({ allRolesDb, Joi });
  try {
    this.result = await createRole({
      role: this.role,
      id: this.id,
      permissions: this.permissions,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while creating new role', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('It will create role with message: {string}', (message) => {
  expect(message).to.be.eql("Role created successfully");
});

