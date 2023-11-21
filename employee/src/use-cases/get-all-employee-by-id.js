module.exports = function makeGetAllEmployeeById({
  employeeDb,
  Joi,
}) {
  return async function getAllEmployeeById({ id }) {
    try {
      const value=validateInput({ id });
      const employeeData = await employeeDb.getAllEmployeeById({ id:value.id });
      if (employeeData.length === 0) {
        throw new Error("Employees data not found");
      }
      //remove compnay ID form Employee Details
      const result = employeeData.map((obj) => {
        delete obj.company_id;
        return obj;
      });
      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
    });
    const { error ,value} = schema.validate({ id });
    if (error) {
      throw error.details[0];
    }
    return value
  }
};
