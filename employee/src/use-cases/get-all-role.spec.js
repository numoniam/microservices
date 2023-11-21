const {
  When,
  Then,
  BeforeAll,
  Before,
  AfterAll,
} = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;

const makeGetAllRole = require("./get-all-role");

const sandbox = sinon.createSandbox();

const allRolesDb = {
  getAllRole: () => {},
};

let getAllRoleStub;

BeforeAll(() => {
  getAllRoleStub = sandbox.stub(allRolesDb, "getAllRole");
});

Before(() => {
  getAllRoleStub.callsFake((args) => {
    return [
      {
        id: "00fab9aa-9ccd-4bf7-96b3-b0bf9c4b5947",
        company_id: "9d41afe8-f5ed-4058-a65d-fd927fd2404f",
        role: "visiter",
        permissions: {
          employee: { get: true, create: true, update: true, delete: true },
        },
      },
    ];
  });
});

AfterAll(() => sandbox.restore());

When("Try to get all role data", async () => {
  const getAllEmployee = makeGetAllRole({ allRolesDb });
  try {
    this.result = await getAllEmployee();
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('Then It will get all role data with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
