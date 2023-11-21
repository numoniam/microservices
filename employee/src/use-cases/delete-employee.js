module.exports = function makeDeleteEmployee({ employeeDb, Joi }) {
  return async function deleteEmployee({ id }) {
    try {
      const value = validateInput({ id });
      //do check is employee exist
      const employeeExist = await employeeDb.isEmployeeExistById({
        id: value.id,
      });
      if (!employeeExist) {
        throw new Error("Employee Data dose note exist");
      }
      //do check if employee is owner or not
      const employeeData = await employeeDb.getEmployee({ id: value.id });
      if (employeeData[0].role == "owner") {
        throw new Error("You can't able to delete default owner user");
      }

      await employeeDb.deleteEmployee({ id: value.id });
      return 
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
