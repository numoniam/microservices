module.exports = function makeGetCategory({ categoryData, Joi}) {
    return async function getCategory({ id }) {
      try {
        const value = validateInput({ id });
        const result = await categoryData.getCategory({ id: value.id });
        if (!result) {
          throw new Error("Document not found");
        }
        return result;
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
  