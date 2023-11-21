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

const makeDeleteEmployeeById = require("./delete-employee-by-id");

const sandbox = sinon.createSandbox();

const employeeDb = {
  deleteEmployeeById: () => {},
};

let deleteEmployeeByIdStub;

BeforeAll(() => {
  deleteEmployeeByIdStub = sandbox.stub(employeeDb, "deleteEmployeeById");
});

Before(() => {
  deleteEmployeeByIdStub.callsFake((args) => {
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

Given("Employee Details id:{string} to delete employee by id", (id) => {
  this.id = id || undefined;
});
When("Try to delete employee by id", async () => {
  const deleteEmployeeById = makeDeleteEmployeeById({ employeeDb, Joi });
  try {
    this.result = await deleteEmployeeById({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while deleting employee by id',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then("It will delete employee by ID with message: {string}", (message) => {
  expect(message).to.be.eql("Employee data Deleted Successfully");
});
