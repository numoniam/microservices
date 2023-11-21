module.exports = function makeCreateRole({ allRolesDb, Joi }) {
  return async function createRole({ role, id, permissions }) {
    try {
      const value=validateInput({ role, id, permissions });
      if(value.role=="owner"){
         throw new Error("You can't create owner role")
      }
      const result=await allRolesDb.createRole({ role:value.role, id:value.id, permissions:value.permissions });
      // console.log(result);
      return result
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ role, id, permissions }) {
    const schema = Joi.object({
      role: Joi.string().required(),
      id: Joi.string().guid().required(),
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
      }).or("employee","role","assign"),
    });
    const { error,value } = schema.validate({ role, id, permissions });
    if (error) {
      throw error.details[0];
    }
    return value
  }
};
