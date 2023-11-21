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

const makeDeleteEmployee = require("./delete-employee");

const sandbox = sinon.createSandbox();

const employeeDb = {
  isEmployeeExistById: () => {},
  getEmployee: () => {},
  deleteEmployee: () => {},
};

let isEmployeeExistByIdStub;
let getEmployeeStub;
let deleteEmployeeStub;

BeforeAll(() => {
  isEmployeeExistByIdStub = sandbox.stub(employeeDb, "isEmployeeExistById");
  getEmployeeStub = sandbox.stub(employeeDb, "getEmployee");
  deleteEmployeeStub = sandbox.stub(employeeDb, "deleteEmployee");
});

Before(() => {
  isEmployeeExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "1c2ac6fb-7440-48dc-a8d0-98526e22faf7") {
      return false;
    } else {
      return true;
    }
  });

  getEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    return [
      {
        id: "164d441b-4b8c-4287-9e2e-96c028e6ca9b",
        name: "defaultUser",
        email: "defaultUser@gmail.com",
        salary: "100000",
        role: "owner",
      },
    ];
  });

  deleteEmployeeStub.callsFake((args) => {
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

Given("Employee Details id:{string} to delete employee", (id) => {
  this.id = id || undefined;
});
When("Try to delete employee", async () => {
  const deleteEmployee = makeDeleteEmployee({ employeeDb, Joi });
  try {
    this.result = await deleteEmployee({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while deleting employee', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("Then It will delete employee with message: {string}", (message) => {
  expect(message).to.be.eql("Employee data deleted successfully");
});
