module.exports = function makeSendEmail({ nodemailer, Joi }) {
  return async function sendEmail({ email }) {
    try {
      const value = validateInput({ email });
      //Create nodemailer transporter
      //which is send email instead of real user
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "savanghori1203@gmail.com",
          pass: "ecnljmolfkyguyhj",
        },
      });

      //Define the email options
      const mailSendIfo = {
        from: '"Savan Ghori" <savanghori1203@gmail.com>',
        to: value.email,
        subject: "Welcome to MyApplication",
        // text: "This is welcome mail from the My Node.js application thank you for using over application ",
        html: "<h1>Welcome to My Application</h1><h3>Thank you for joining us!</h3>",
      };

      //send email
      const info = await transporter.sendMail(mailSendIfo);
      if (info.messageId) {
        console.log("Message successfully sent");
      }
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ email }) {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
    });
    const { error, value } = schema.validate({ email });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
