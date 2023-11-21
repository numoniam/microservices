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
const { Kafka } = require("kafkajs");

const makeDeleteCompany = require("./delete-company");

const sandbox = sinon.createSandbox();

const companyDb = {
  isCompanyExistById: () => {},
  deleteCompany: () => {},
};

let isCompanyExistByIdStub;
let deleteCompanyStub;
BeforeAll(() => {
  isCompanyExistByIdStub = sandbox.stub(companyDb, "isCompanyExistById");
  deleteCompanyStub = sandbox.stub(companyDb, "deleteCompany");
});

Before(() => {
  isCompanyExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return false;
    } else {
      return true;
    }
  });

  deleteCompanyStub.callsFake((args) => {
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

Given("Company Details id:{string} to delete company", (id) => {
  this.id = id || undefined;
});
When("Try to delete company", async () => {
  const deleteCompany = makeDeleteCompany({ Joi, Kafka, companyDb });
  try {
    this.result = await deleteCompany({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while deleting company', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("Then It will delete company with message: {string}", (message) => {
  expect(this.result).deep.equal(message);
});
