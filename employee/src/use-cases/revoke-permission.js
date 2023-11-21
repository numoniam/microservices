module.exports = function makeRevokePermission({ employeeRolesDb, Joi }) {
  return async function revokePermission({ id }) {
    try {
      const value = validateInput({ id });
      const roleExist = await employeeRolesDb.isRoleExistById({ id: value.id }); //role ID
      if (!roleExist) {
        throw new Error("Role no more exist");
      }
      await employeeRolesDb.revokePermission({ id: value.id });
      return "Revoked permission successfully"
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
