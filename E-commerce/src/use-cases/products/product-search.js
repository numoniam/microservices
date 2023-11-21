module.exports = function makeProductSearch({ productData,Joi }) {
  return async function productSearch({ product_name, order }) {
    try {
      const value = validateInput({ product_name, order });
      return await productData.productSearch({
        product_name: value.product_name,
        order: value.order,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ product_name, order }) {
    const schema = Joi.object({
      product_name: Joi.string().trim().required(),
      order: Joi.string().valid("asc", "desc").optional(),
    });
    const { error, value } = schema.validate({ product_name, order });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
