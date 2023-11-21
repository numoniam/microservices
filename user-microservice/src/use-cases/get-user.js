module.exports = function makeGetUser({ userDataDb, Joi }) {
  return async function getUser({ id }) {
    try {
      const value = validateInput({ id });
      const userData = await userDataDb.getUser({ id: value.id });
      if (!userData) {
        throw new Error("User data not found");
      }
      return userData;
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
