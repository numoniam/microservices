const { When, Then, BeforeAll, Before, AfterAll } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;

const makeGetAllEmployee = require("./get-all-employee");

const sandbox = sinon.createSandbox();

const employeeDb = {
  getAllEmployee: () => {},
};
let getAllEmployeeStub;

BeforeAll(() => {
  getAllEmployeeStub = sandbox.stub(employeeDb, "getAllEmployee");
});

Before(() => {
  getAllEmployeeStub.callsFake((args) => {
    return [
      {
        id: "164d441b-4b8c-4287-9e2e-96c028e6ca9b",
        company_id: "2a6b513c-eeef-4ee3-92d6-596291070d33",
        email: "defaultUser@gmail.com",
        role: "owner",
      },
    ];
  });
});

AfterAll(() => sandbox.restore());

When("Try to get all employee data", async () => {
  const getAllEmployee = makeGetAllEmployee({ employeeDb });
  try {
    this.result = await getAllEmployee();
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then(
  'Then It will get all employee data with message: "{string}"',
  (message) => {
    expect(this.result).deep.equal(JSON.parse(message));
  }
);
