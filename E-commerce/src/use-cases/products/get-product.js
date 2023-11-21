module.exports = function makeGetProduct({ productData, Joi }) {
  return async function getProduct({ id }) {
    try {
      const value = validateInput({ id });
      const result = await productData.getProduct({ id: value.id });
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
