module.exports = function makeDeleteEmployeeById({ employeeDb, Joi }) {
    return async function deleteEmployeeById({ id }) {
      try {
        validateInput({ id });
        await employeeDb.deleteEmployeeById({ id }); //company ID
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
  