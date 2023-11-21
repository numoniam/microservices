const { When, Then, BeforeAll, Before, AfterAll } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;

const makeGetAllCompany = require("./get-all-company");

const sandbox = sinon.createSandbox();

const companyDb = {
  getAllCompany: () => {},
};

let getAllCompanyStub;

BeforeAll(() => {
  getAllCompanyStub = sandbox.stub(companyDb, "getAllCompany");
});

Before(() => {
  getAllCompanyStub.callsFake((args) => {
    return [
      {
        id: "202a7a07-f547-4225-aa75-014ab8c4bb20",
        name: "zxc",
        contact: "1234567890",
        city: "zxcvbn",
        address: "varaccha",
      },
    ];
  });
});

AfterAll(() => sandbox.restore());

When("Try to get al company data", async () => {
  const getAllCompany = makeGetAllCompany({ companyDb });
  try {
    this.result = await getAllCompany();
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'Then It will get all company data with message: "{string}"',
  (message) => {
    expect(this.result).deep.equal(JSON.parse(message));
  }
);
