module.exports = function makeGetRole({ allRolesDb, Joi }) {
  return async function getRole({ id }) {
    try {
      const value = validateInput({ id });
      const roleData = await allRolesDb.getRole({ id: value.id });
      if (!roleData) {
        throw new Error("Role data not found");
      }
      return roleData;
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
