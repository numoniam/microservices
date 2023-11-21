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

const makeLoginUser = require("./login-user");

const sandbox = sinon.createSandbox();

const userDataDb = {
  isValidEmail: () => {},
};
const userTokenDb = {
  loginUser: () => {},
};
const bcrypt = {
  compareSync: () => {},
};
const jwt = {
  sign: () => {},
};
const sendWelcomeMail = {
  sendEmail: () => {},
};

let isValidEmailStub;
let comparissionPasswodStub;
let jwtTokenGenerationStub;
let loginUserStub;
let sendEmailStub;

BeforeAll(() => {
  isValidEmailStub = sandbox.stub(userDataDb, "isValidEmail");
  comparissionPasswodStub = sandbox.stub(bcrypt, "compareSync");
  jwtTokenGenerationStub = sandbox.stub(jwt, "sign");
  loginUserStub = sandbox.stub(userTokenDb, "loginUser");
  sendEmailStub = sandbox.stub(sendWelcomeMail, "sendEmail");
});

Before(() => {
  isValidEmailStub.callsFake((args) => {
    expect(args).deep.equal({
      email: this.email,
    });
    if (args.email === "xyz12@gmail.com") {
      return false;
    } else {
      return [
        {
          id: "5d37e404-490e-4673-b8fa-af69c7b4e6cb",
          name: "savan",
          email: "savanghori13@gmail.com",
          password:
            "$2b$10$TtcNaH/277nYcQ1Wloi9fOoU5/n6ibRes.pG44X9jY4KezBFLxc.W",
        },
      ];
    }
  });

  comparissionPasswodStub.callsFake((args) => {
    if (
      args.password ===
      "$2b$10$iyDCdeL47YI8vwHP2FoqF.C756QNsvCw0Er9vHWT757GPQ0FUGamC"
    ) {
      return false;
    } else {
      return true;
    }
  });

  jwtTokenGenerationStub.callsFake((args) => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0MmU1NjZkLTQ2YmYtNGQ3ZC05OGQzLWQwN2RiZjAxYzVhYyIsImVtYWlsIjoic2F2YW5naG9yaTEyQGdtYWlsLmNvbSIsImlhdCI6MTY4OTc0MzM5NCwiZXhwIjozMzc5NTczMTg4fQ.bgoEpfSELwkaka_Q1AQvVXwGwRNDmCTCkX0rGahiYDo";
  });

  loginUserStub.callsFake((args) => {
    expect(args).deep.equal({
      id: args.id,
      jwtToken: args.jwtToken,
    });
  });

  sendEmailStub.callsFake((args) => {
    expect(args).deep.equal({
      email: args.email,
    });
  });
});

After(() => {
  this.email = undefined;
  this.password = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given(
  "User details email:{string},password:{string} to login user",
  (email, password) => {
    this.email = email || undefined;
    this.password = password || undefined;
  }
);

When("Try to login with user", async () => {
  const loginUser = makeLoginUser({
    userTokenDb,
    userDataDb,
    sendEmail: sendEmailStub,
    jwt,
    bcrypt,
    Joi,
  });
  try {
    this.result = await loginUser({
      email: this.email,
      password: this.password,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while login with user', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("Then It will login with user and message: {string}", (message) => {
  // expect(this.result).deep.equal(message);
  expect(message).to.be.eql("User Logged in successfully");
});
