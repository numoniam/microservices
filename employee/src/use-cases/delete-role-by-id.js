module.exports = function makeDeleteRoleById({ allRolesDb, Joi }) {
  return async function deleteRoleById({ id }) {
    try {
      validateInput({ id });
      await allRolesDb.deleteRoleById({ id }); //company ID
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().guid().required(),
    });
    const { error } = schema.validate({ id });
    if (error) {
      throw error.details[0];
    }
  }
};
