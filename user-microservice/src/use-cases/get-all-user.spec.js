const { When, Then, BeforeAll, Before, AfterAll } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;

const makeGetAllUser = require("./get-all-user");

const sandbox = sinon.createSandbox();

const userDataDb = {
  getAllUser: () => {},
};

let getAllCompanyStub;

BeforeAll(() => {
  getAllCompanyStub = sandbox.stub(userDataDb, "getAllUser");
});

Before(() => {
  getAllCompanyStub.callsFake((args) => {
    return [
      {
        id: "4bc26ffa-37a0-4fdf-adff-493806ff3879",
        name: "manthan",
        email: "manthan12@gmail.com",
        password:
          "$2b$10$iyDCdeL47YI8vwHP2FoqF.C756QNsvCw0Er9vHWT757GPQ0FUGamC",
      },
    ];
  });
});

AfterAll(() => sandbox.restore());

When("Try to get all user data", async () => {
  const getAllUser = makeGetAllUser({ userDataDb });
  try {
    this.result = await getAllUser();
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('Then It will get all user data with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
