module.exports = function makeUpdateUser({ userDataDb, bcrypt, Joi }) {
  return async function updateUser({ userUpdateData, id }) {
    try {
      const value = validateInput({ userUpdateData, id });

      //do check if user valid or not
      const userExist = await userDataDb.isUserExistById({ id: value.id });
      if (!userExist) {
        throw new Error("User not Exist");
      }

      //do check email is already exist
      if (value.userUpdateData.email) {
        const emailExist = await userDataDb.isUserExistByEmail({
          email: value.userUpdateData.email,
        });
        if (emailExist) {
          throw new Error(
            "This mail user already exist please use unique email"
          );
        }
      }

      //password encryption
      const saltRounds = 10; // The higher the number the more secure but slower the hashing process
      if (value.userUpdateData.password) {
        value.userUpdateData.password = await bcrypt.hash(
          value.userUpdateData.password,
          saltRounds
        );
      }
      
      await userDataDb.updateUser({
        userUpdateData: value.userUpdateData,
        id: value.id,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ userUpdateData, id }) {
    const schema = Joi.object({
      userUpdateData: Joi.object({
        name: Joi.string().trim().optional(),
        email: Joi.string().trim().email().optional(),
        password: Joi.string()
          .trim()
          .pattern(
            new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$")
          )
          .optional()
          .messages({
            "string.pattern.base":
              "Password must be at least 8 characters long and contain at least one letter and one number",
          }),
      }).or("name", "email", "password"),
      id: Joi.string().trim().guid().required(),
    });

    const { error, value } = schema.validate({ userUpdateData, id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
