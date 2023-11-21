module.exports = function makeGetAssignRole({ employeeRolesDb, Joi }) {
  return async function getAssignRole({ id }) {
    try {
      validateInput({ id });
      const assignRoleData = await employeeRolesDb.getAssignRole({ id }); //employee ID
      if (!assignRoleData) {
        throw new Error("Assign role data not found");
      }
      return assignRoleData;
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
