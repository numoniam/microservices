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

const makeGetRole = require("./get-role");

const sandbox = sinon.createSandbox();

const allRolesDb = {
  getRole: () => {},
};

let getRoleStub;

BeforeAll(() => {
  getRoleStub = sandbox.stub(allRolesDb, "getRole");
});

Before(() => {
  getRoleStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
    if (args.id == "1c2ac6fb-7440-48dc-a8d0-98526e22faf7") {
      return false;
    } else {
      return [
        {
          id: "0c7117da-1138-491f-8780-5dd1746c2bbe",
          company_id: "9d41afe8-f5ed-4058-a65d-fd927fd2404f",
          role: "dev",
          permissions: {
            employee: { get: true, create: true, update: true, delete: true },
          },
        },
      ];
    }
  });
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Role Details id:{string} to get role", (id) => {
  this.id = id || undefined;
});
When("Try to get role", async () => {
  const getRole = makeGetRole({ allRolesDb, Joi });
  try {
    this.result = await getRole({
      id: this.id,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while geting role', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then('Then It will get role with message: "{string}"', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
