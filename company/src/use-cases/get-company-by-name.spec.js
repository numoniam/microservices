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

const makeGetCompanyByName = require("./get-company-by-name");

const sandbox = sinon.createSandbox();

const companyDb = {
  getCompanyByName: () => {},
};

let getCompanyByNameStub;

BeforeAll(() => {
  getCompanyByNameStub = sandbox.stub(companyDb, "getCompanyByName");
});

Before(() => {
  getCompanyByNameStub.callsFake((args) => {
    expect(args).deep.equal({
      name: this.name,
    });
    if (args.name == "salesmate") {
      return false;
    } else {
      return [
        {
          id: "710f805a-291f-4e25-9ae6-5b1786fbd81f",
          name: "rapidops",
          contact: "7621847052",
        },
      ];
    }
  });
});

After(() => {
  this.name = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Company Details name:{string} to get company by name", (name) => {
  this.name = name || undefined;
});

When("Try to get company by name", async () => {
  const getCompanyByName = makeGetCompanyByName({ companyDb, Joi });
  try {
    this.result = await getCompanyByName({
      name: this.name,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'It will throw error: "{string}" while geting company by name',
  (message) => {
    expect(this.error).deep.equal({
      message,
    });
  }
);
Then('Then It will get company by name with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
