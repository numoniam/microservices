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

const makeDeleteRoleById = require("./delete-role-by-id");

const sandbox = sinon.createSandbox();

const allRolesDb = {
  deleteRoleById: () => {},
};

let deleteRoleByIdStub;

BeforeAll(() => {
  deleteRoleByIdStub = sandbox.stub(allRolesDb, "deleteRoleById");
});

Before(() => {
  deleteRoleByIdStub.callsFake((args) => {
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

Given("Role Details id:{string} to delete role by id", (id) => {
  this.id = id || undefined;
});
When("Try to delte role by id", async () => {
  const deleteRoleById = makeDeleteRoleById({ allRolesDb, Joi });
  try {
    this.result = await deleteRoleById({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while deleting role by id', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("It will delete role by id  with message: {string}", (message) => {
  expect(message).to.be.eql("Employee role data deleted successfully");
});
