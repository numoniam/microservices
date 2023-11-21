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

const makeCreateEmployee = require("./create-employee");

const sandbox = sinon.createSandbox();

const internalService = {
  getCompanyId: () => {},
};
const employeeDb = {
  createEmployee: () => {},
};
const allRolesDb = {
  createRole: () => {},
};
const employeeRolesDb = {
  assignRole: () => {},
};

let getCompanyIdStub;
let createEmployeeStub;
let createRoleStub;
let assignRoleStub;

BeforeAll(() => {
  getCompanyIdStub = sandbox.stub(internalService, "getCompanyId");
  createEmployeeStub = sandbox.stub(employeeDb, "createEmployee");
  createRoleStub = sandbox.stub(allRolesDb, "createRole");
  assignRoleStub = sandbox.stub(employeeRolesDb, "assignRole");
});

Before(() => {
  getCompanyIdStub.callsFake((args) => {
    expect(args).deep.equal({
      companyName: this.companyName,
    });
    if (args.name == "salesmate") {
      this.companyId = "fbcdfba8-6be4-4038-988e-a9ddb8b7d89d";
    }
  });

  createEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
      companyId: this.companyId,
      name: this.name,
      email: this.email,
      salary: this.salary,
      role: this.role,
    });
    return {
      id: "6fb48301-e9d5-4ab0-a76f-88a843aeb5d5",
      company_id: "4ef50d64-6d4f-4aa7-9418-781b852a772c",
      role: "intern",
    };
  });

  createRoleStub.callsFake((args) => {
    expect(args).deep.equal({});
  });

  assignRoleStub.callsFake((args) => {
    expect(args).deep.equal({});
  });
});

After(() => {
  this.companyName = undefined;
  this.companyId = undefined;
  this.name = undefined;
  this.email = undefined;
  this.salary = undefined;
  this.role = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Employee details companyName:{string},companyId:{string},name:{string},email:{string},salary:{string},role:{string} to create new employee",
  (companyName, companyId, name, email, salary, role) => {
    this.companyName = companyName || undefined;
    this.companyId = companyId || undefined;
    this.name = name || undefined;
    this.email = email || undefined;
    this.salary = salary || undefined;
    this.role = role || undefined;
  }
);

When("Try to create new employee", async () => {
  const createEmployee = makeCreateEmployee({
    employeeDb,
    allRolesDb,
    employeeRolesDb,
    getCompanyId: getCompanyIdStub,
    Joi,
  });
  try {
    this.result = await createEmployee({
      companyName: this.companyName,
      companyId: this.companyId,
      name: this.name,
      email: this.email,
      salary: this.salary,
      role: this.role,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while creating new employee',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then("It will create employee with message: {string}", (message) => {
  expect(message).to.be.eql("Employee data created successfully");
});
