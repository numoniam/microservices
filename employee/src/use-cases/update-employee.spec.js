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

const makeUpdateEmployee = require("./update-employee");

const sandbox = sinon.createSandbox();

const employeeDb = {
  isEmployeeExistById: () => {},
  updateEmployee: () => {},
};

let isEmployeeExistByIdStub;
let updateEmployeeStub;

BeforeAll(() => {
  isEmployeeExistByIdStub = sandbox.stub(employeeDb, "isEmployeeExistById");
  updateEmployeeStub = sandbox.stub(employeeDb, "updateEmployee");
});

Before(() => {
  isEmployeeExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "07c8e364-987e-4103-a9d6-619686f13174") {
      return false;
    } else {
      return true;
    }
  });

  updateEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
      employeeUpdateData: args.employeeUpdateData,
      id: args.id,
    });
    return "Employee data updated successfully";
  });
});

After(() => {
  this.id = undefined;
  this.employeeUpdateData = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Emeployee Details id:{string},employeeUpdateData:{string} to update employee",
  (id, employeeUpdateData) => {
    this.id = id || undefined;
    this.employeeUpdateData = JSON.parse(employeeUpdateData) || undefined;
  }
);

When("Try to update employee", async () => {
  const updateEmployee = makeUpdateEmployee({ employeeDb, Joi });
  try {
    this.result = await updateEmployee({
      employeeUpdateData: this.employeeUpdateData,
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while updating employee', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("Then It will update employee ewith message: {string}", (message) => {
  expect(message).to.be.eql("Employee data updated successfully");
});
