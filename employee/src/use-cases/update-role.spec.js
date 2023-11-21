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

const makeUpdateRole = require("./update-role");

const sandbox = sinon.createSandbox();

const allRolesDb = {
  isRoleExistById: () => {},
  updateRole: () => {},
};

let isRoleExistByIdStub;
let updateRoleStub;

BeforeAll(() => {
  isRoleExistByIdStub = sandbox.stub(allRolesDb, "isRoleExistById");
  updateRoleStub = sandbox.stub(allRolesDb, "updateRole");
});

Before(() => {
  isRoleExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id === "00fab9aa-9ccd-4bf7-96b3-b0bf9c4b5947") {
      return false;
    } else {
      return true;
    }
  });

  updateRoleStub.callsFake((args) => {
    expect(args).deep.equal({
      roleUpdateData: args.roleUpdateData,
      id: args.id,
    });
  });
});

After(() => {
  this.id = undefined;
  this.roleUpdateData = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Role Details id:{string},roleUpdateData:{string} to update role",
  (id, roleUpdateData) => {
    this.id = id || undefined;
    this.roleUpdateData = JSON.parse(roleUpdateData) || undefined;
  }
);

When("Try to update role", async () => {
  const updateRole = makeUpdateRole({ allRolesDb, Joi });
  try {
    this.result = await updateRole({
      roleUpdateData: this.roleUpdateData,
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while updating role', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("It will update role with message: {string}", (message) => {
  // expect(this.error).to.be.undefined;
  // expect(JSON.stringify(this.result)).to.be.equal(this.result);
  expect(message).to.be.eql("Role Updated successfully");
});
