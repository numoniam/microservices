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

const makeDeleteRole = require("./delete-role");

const sandbox = sinon.createSandbox();

const allRolesDb = {
  isRoleExistById: () => {},
  deleteRole: () => {},
};

let isRoleExistByIdStub;
let deleteRoleStub;

BeforeAll(() => {
  isRoleExistByIdStub = sandbox.stub(allRolesDb, "isRoleExistById");
  deleteRoleStub = sandbox.stub(allRolesDb, "deleteRole");
});

Before(() => {
  isRoleExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "51235254-6ae7-46b0-9745-8726832ba215") {
      return false;
    } else {
      return true;
    }
  });
  deleteRoleStub.callsFake((args) => {
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

Given("Role Details id:{string} to delete role", (id) => {
  this.id = id || undefined;
});
When("Try to delete role", async () => {
  const deleteRole = makeDeleteRole({ allRolesDb, Joi });
  try {
    this.result = await deleteRole({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while deleting role', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("Then It will delete role with message: {string}", (message) => {
  expect(this.result).deep.equal(message);
});
