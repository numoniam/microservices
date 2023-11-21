module.exports = function makeCreateUser({ userDataDb, bcrypt, Joi }) {
  return async function createUser({ name, email, password }) {
    try {
      const value = validateInput({ name, email, password });

      //check if mail is alredy exist or not
      const emailExist = await userDataDb.isUserExistByEmail({
        email: value.email,
      });
      if (emailExist) {
        throw new Error("Email Already exist");
      }
           
      const saltRounds = 10; // The higher the number the more secure but slower the hashing process
      const hashPassword = await bcrypt.hash(value.password, saltRounds);
      
      const result = await userDataDb.createUser({
        name: value.name,
        email: value.email,
        password: hashPassword,
      });

      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ name, email, password }) {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
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

    const { error, value } = schema.validate({ name, email, password });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
