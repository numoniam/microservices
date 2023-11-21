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

const makeCreateCompany = require("./create-company");

const sandbox = sinon.createSandbox();

const companyDb = {
  isCompanyExistByName: () => {},
  createCompany: () => {},
};
const createEmployeeDb = {
  createDefaultEmployee: () => {},
};

let isCompanyExistByNameStub;
let createCompanyStub;
let createDefaultEmployeeStub;

BeforeAll(() => {
  isCompanyExistByNameStub = sandbox.stub(companyDb, "isCompanyExistByName");

  createCompanyStub = sandbox.stub(companyDb, "createCompany");

  createDefaultEmployeeStub = sandbox.stub(
    createEmployeeDb,
    "createDefaultEmployee"
  );
});

Before(() => {
  isCompanyExistByNameStub.callsFake((args) => {
    expect(args).deep.equal({
      name: this.name,
    });
    if (args.name === "salesmate") {
      return true;
    }
  });

  createCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
      name: this.name,
      contact: this.contact,
      city: this.city,
      address: this.address,
    });
    return { id: "c517c5df-46d2-423a-8d3a-b89eb8ee21eb" };
  });

  createDefaultEmployeeStub.callsFake((args) => {
    expect(args).deep.equal({
      id: "c517c5df-46d2-423a-8d3a-b89eb8ee21eb",
    });
  });
});

After(() => {
  this.name = undefined;
  this.contact = undefined;
  this.city = undefined;
  this.address = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "Company details name:{string},contact:{string},city:{string},address:{string} to create new company",
  (name, contact, city, address) => {
    this.name = name || undefined;
    this.contact = parseInt(contact) || undefined;
    this.city = city || undefined;
    this.address = address || undefined;
  }
);

When("Try to create new company", async () => {
  const createCompany = makeCreateCompany({
    Joi,
    companyDb,
    createDefaultEmployee: createDefaultEmployeeStub,
  });
  try {
    this.result = await createCompany({
      name: this.name,
      contact: this.contact,
      city: this.city,
      address: this.address,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while creating new company',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);

Then('Then It will create new company with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
