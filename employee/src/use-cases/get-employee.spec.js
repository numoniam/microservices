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

const makeGetEmployee = require("./get-employee");

const sandbox = sinon.createSandbox();

const employeeDb = {
  getEmployee: () => {},
};

const internalServiceCall = {
  getCompanyDetail: () => {},
};

let getEmployeeStub;
let getCompanyDetailStub;

BeforeAll(() => {
  getEmployeeStub = sandbox.stub(employeeDb, "getEmployee");
  getCompanyDetailStub = sandbox.stub(internalServiceCall, "getCompanyDetail");
});

Before(() => {
  getEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return false;
    } else {
      return [
        {
          id: "07c8e364-987e-4103-a9d6-619686f13174",
          company_id: "4ef50d64-6d4f-4aa7-9418-781b852a772c",
          email: "savanghori12@gmail.com",
          role: "intern",
        },
      ];
    }
  });

  getCompanyDetailStub.callsFake((args) => {
    expect(args).deep.equal({
      id: args.id,
    });
    return {
      id: "4ef50d64-6d4f-4aa7-9418-781b852a772c",
      name: "salesmate",
      city: "ahmedabad",
      employee: [
        {
          id: "07c8e364-987e-4103-a9d6-619686f13174",
          email: "savanghori12@gmail.com",
          role: "intern",
        },
      ],
    };
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Employee Details id:{string} to get employee", (id) => {
  this.id = id || undefined;
});
When("Try to get employee", async () => {
  const getEmployee = makeGetEmployee({
    employeeDb,
    getCompanyDetail: getCompanyDetailStub,
    Joi,
  });
  try {
    this.result = await getEmployee({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while geting employee', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('Then It will get employee data with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
