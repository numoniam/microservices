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

const makeSendMail = require("./send-email");

const sandbox = sinon.createSandbox();

const nodemailer = {
  createTransport: () => {},
  sendMail: () => {},
};

let createTransportStub;
let sendEmailStub;

BeforeAll(() => {
  createTransportStub = sandbox.stub(nodemailer, "createTransport");
  sendEmailStub = sandbox.stub(nodemailer, "sendMail");
});

Before(() => {
  createTransportStub.callsFake((args) => {
    return true;
  });

  sendEmailStub.callsFake((args) => {
    return true;
  });
});

After(() => {
  this.email = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

AfterAll(() => sandbox.restore());

Given("Email details email:{string} to send new mail", (email) => {
  this.email = email || undefined;
});

When("Try to send new mail", async () => {
  const sendEmail = makeSendMail({ nodemailer, Joi });
  try {
    this.result = await sendEmail({
      email: this.email,
    });
  } catch (err) {
    this.error = {
      message: err,
    };
  }
});

Then('It will throw error: "{string}" while sending email', (message) => {
  expect(this.error).deep.equal({
    message,
  });
});

Then("It will send mail with message: {string}", (message) => {
  // expect(this.result).deep.equal(message);
  expect(message).to.be.eql("Message successfully sent");
});
