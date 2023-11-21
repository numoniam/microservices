module.exports = function makeLoginUser({
  userTokenDb,
  userDataDb,
  sendEmail,
  jwt,
  bcrypt,
  Joi,
}) {
  return async function loginUser({ email, password }) {
    try {
      const value = validateInput({ email, password });
      //check if user register or not
      const userData = await userDataDb.isValidEmail({ email });
      if (!userData) {
        throw new Error("Invalid Email Address");
      }

      //password matching
      const result = await bcrypt.compareSync(
        value.password,
        userData[0].password
      ); //return true and false

      if (!result) {
        throw new Error("Invalid password");
      }
  
      //jwt
      const payload = {
        id: userData[0].id,
        email: value.email,
      };
  
      const secretKey = "savanghori1234@#1203";

      // Set the expiration time to 24 hours from now
      const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  
      const token = await jwt.sign(payload, secretKey, { expiresIn: expiration });
    
      //store jwt token
      await userTokenDb.loginUser({ id: userData[0].id, jwtToken: token });
    
      //send welcome email
      await sendEmail({ email: value.email });
  
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ email, password }) {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string()
        .trim()
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"))
        .required()
        .messages({
          "string.pattern.base":
            "Password must be at least 8 characters long and contain at least one letter and one number",
        }),
    });

    const { error, value } = schema.validate({ email, password });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
