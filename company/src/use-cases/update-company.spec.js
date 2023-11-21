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

const makeUpdateCompany = require("./update-company");

const sandbox = sinon.createSandbox();

const companyDb = {
  isCompanyExistById: () => {},
  isCompanyExistByName: () => {},
  updateCompany: () => {},
};

let isCompanyExistByIdStub;
let isCompanyExistByNameStub;
let updateCompanyStub;

BeforeAll(() => {
  isCompanyExistByIdStub = sandbox.stub(companyDb, "isCompanyExistById");

  isCompanyExistByNameStub = sandbox.stub(companyDb, "isCompanyExistByName");

  updateCompanyStub = sandbox.stub(companyDb, "updateCompany");
});

Before(() => {
  isCompanyExistByIdStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "a9b788ce-f6e1-4372-ba55-1ad21258afea") {
      return false;
    } else {
      return true;
    }
  });

  isCompanyExistByNameStub.callsFake((args) => {
    expect(args).deep.equal({
      name: this.updateCompanyData.name,
    });
    if ((args.name = "salesmate")) {
      return true;
    } else {
      return this.updateCompanyData;
    }
  });

  updateCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
      updateCompanyData: this.updateCompanyData,
      id: this.id,
    });
    return "company data updated successfully";
  });
});

After(() => {
  this.updateCompanyData = undefined;
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "company Details id:{string},updateCompanyData:{string} to update company",
  (id, updateCompanyData) => {
    this.updateCompanyData = JSON.parse(updateCompanyData) || undefined;
    this.id = id || undefined;
  }
);

When("Try to update company", async () => {
  const updateCompany = makeUpdateCompany({ companyDb, Joi });
  try {
    this.result = await updateCompany({
      updateCompanyData: this.updateCompanyData,
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while updating company', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('Then It will update company with message: "{string}"', (message) => {
  expect(this.result).deep.equal(message);
});
