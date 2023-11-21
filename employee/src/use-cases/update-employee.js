module.exports = function makeUpdateEmployee({ employeeDb, Joi }) {
  return async function updateEmployee({ employeeUpdateData, id }) {
    try {
      const value = validateInput({ employeeUpdateData, id });
      //check if employee exist or not
      const employeeExist = await employeeDb.isEmployeeExistById({
        id: value.id,
      });
      if (!employeeExist) {
        throw new Error("Employee dose not exist");
      }

      await employeeDb.updateEmployee({
        employeeUpdateData: value.employeeUpdateData,
        id: value.id,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ employeeUpdateData, id }) {
    const schema = Joi.object({
      employeeUpdateData: Joi.object({
        name: Joi.string().trim().optional(),
        email: Joi.string().email().optional(),
        salary: Joi.number().integer().positive().optional(),
        role: Joi.string().trim().optional(),
      }).or("name", "email", "salary", "role"),
      id: Joi.string().trim().guid().required(),
    });

    const { error, value } = schema.validate({
      employeeUpdateData,
      id,
    });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
