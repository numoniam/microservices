module.exports = function makeDeleteRole({ allRolesDb, Joi }) {
  return async function deleteRole({ id }) {
    try {
      const value = validateInput({ id });
      const roleExist = await allRolesDb.isRoleExistById({ id:value.id });
      if(!roleExist){
        throw new Error("Role Data dose note exist");
      }
      await allRolesDb.deleteRole({ id: value.id });
      return "Role data Deleted Successfully"
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
