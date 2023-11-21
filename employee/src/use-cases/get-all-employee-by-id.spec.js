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

const makeGetAllEmployeeById = require("./get-all-employee-by-id");

const sandbox = sinon.createSandbox();

const employeeDb = {
  getAllEmployeeById: () => {},
};

let getAllEmployeeByIdStub;

BeforeAll(() => {
  getAllEmployeeByIdStub = sandbox.stub(employeeDb, "getAllEmployeeById");
});

Before(() => {
  getAllEmployeeByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return [];
    } else {
      return [
        {
          id: "fbdba0e5-dcec-4b1a-a7dc-551dd682af64",
          name: "smit",
          email: "savanghori12@gmail.com",
          salary: "10000",
          role: "intern",
        },
      ];
    }
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Get Details id:{string} to get all employee by id", (id) => {
  this.id = id || undefined;
});
When("Try to get all employee by id", async () => {
  const getAllEmployee = makeGetAllEmployeeById({ employeeDb, Joi });
  try {
    this.result = await getAllEmployee({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while geting all employee ny id',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then(
  'Then It will get all employee by id with message: "{string}"',
  (message) => {
    expect(this.result).deep.equal(JSON.parse(message));
  }
);
