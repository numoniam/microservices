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

const makeGetCompany = require("./get-company");

const sandbox = sinon.createSandbox();

const companyDb = {
  getCompany: () => {},
};

const internalServiceCall = {
  getEmployeeDetail: () => {},
};

let getCompanyStub;
let getEmployeeDetailStub;

BeforeAll(() => {
  getCompanyStub = sandbox.stub(companyDb, "getCompany");
  getEmployeeDetailStub = sandbox.stub(
    internalServiceCall,
    "getEmployeeDetail"
  );
});

Before(() => {
  getCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "f36878d5-2e29-46b0-abcd-8cc5d28f7f07") {
      return false;
    } else {
      return [
        {
          id: "e093a1a9-2118-4aa6-a053-a3efb46802a8",
          name: "ghori infotech",
        },
      ];
    }
  });

  getEmployeeDetailStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    return [
      {
        id: "811864a1-3dbd-40c8-a401-0fba16c2675f",
        name: "defaultUser",
        email: "defaultUser@gmail.com",
      },
    ];
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Company Details id:{string} to get company", (id) => {
  this.id = id || undefined;
});
When("Try to get company", async () => {
  const getCompany = makeGetCompany({
    companyDb,
    getEmployeeDetail: getEmployeeDetailStub,
    Joi,
  });
  try {
    this.result = await getCompany({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while geting company', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('Then It will get company with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
