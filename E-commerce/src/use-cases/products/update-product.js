module.exports = function makeUpdateProdut({ productData, Joi }) {
  return async function updateProduct({ id, updateProductData }) {
    try {
      const value = validateInput({ id, updateProductData });
      const result = await productData.updateProduct({
        id: value.id,
        updateProductData: value.updateProductData,
      });

      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id, updateProductData }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
      updateProductData: Joi.object({
        product_name: Joi.string().trim().optional(),
        category_id: Joi.string().trim().guid().optional(),
      }).or("product_name", "category_id")
    });

    const { error, value } = schema.validate({ id, updateProductData });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
