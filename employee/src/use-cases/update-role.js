module.exports = function makeUpdateRole({ allRolesDb, Joi }) {
  return async function updateRole({ roleUpdateData, id }) {
    try {
      const value = validateInput({ roleUpdateData, id });
      //do check if role exist
      const roleExist = await allRolesDb.isRoleExistById({ id: value.id });
      if (!roleExist) {
        throw new Error("Role Dose Not Exist");
      }
      await allRolesDb.updateRole({
        roleUpdateData: value.roleUpdateData,
        id: value.id,
      });
    } catch (err) {
      throw err.message;
    }

    function validateInput({ roleUpdateData, id }) {
      const schema = Joi.object({
        roleUpdateData: Joi.object({
          role: Joi.string().trim().optional(),
          permissions: Joi.object({
            employee: Joi.object({
              create: Joi.boolean().optional(),
              get: Joi.boolean().optional(),
              update: Joi.boolean().optional(),
              delete: Joi.boolean().optional(),
            }).or("create", "get", "update", "delete"),
            role: Joi.object({
              create: Joi.boolean().optional(),
              get: Joi.boolean().optional(),
              update: Joi.boolean().optional(),
              delete: Joi.boolean().optional(),
            }).or("create", "get", "update", "delete"),
            assign: Joi.object({
              create: Joi.boolean().optional(),
              delete: Joi.boolean().optional(),
              get: Joi.boolean().optional(),
            }).or("create", "delete", "get"),
          }).or("employee", "role", "assign"),
        }).or("role", "permissions"),
        id: Joi.string().trim().guid().required(),
      });
      const { error, value } = schema.validate({ roleUpdateData, id });
      if (error) {
        throw error.details[0];
      }
      return value;
    }
  };
};
