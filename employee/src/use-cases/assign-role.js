module.exports = function makeAssignRole({ employeeRolesDb, Joi }) {
  return async function assignRole({ employeeId, roleId }) {
    try {
      const value=validateInput({ employeeId, roleId });
      await employeeRolesDb.assignRole({ employeeId:value.employeeId, roleId:value.roleId });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ employeeId, roleId }) {
    const schema = Joi.object({
      employeeId: Joi.string().trim().guid().required(),
      roleId: Joi.string().trim().guid().required(),
    });
    const { error,value } = schema.validate({ employeeId, roleId });
    if (error) {
      throw error.details[0];
    }
    return value
  }
};
