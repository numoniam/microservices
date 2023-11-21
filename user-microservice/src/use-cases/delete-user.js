module.exports = function makeDeleteUser({ userDataDb, Joi }) {
  return async function deleteUser({ id }) {
    try {
      const value = validateInput({ id });
      //do sheck if user data availabale
      const result = await userDataDb.isUserExistById({ id });
      if (!result) {
        throw new Error("User Data dose note exist");
      }
      await userDataDb.deleteUser({ id: value.id });

      return "User data deleted successfully"
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
    });
    const { error, value } = schema.validate({ id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
