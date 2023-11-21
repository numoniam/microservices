module.exports = function makeAddCategory({ categoryData, Joi }) {
  return async function addCategory({ category_name, product_ids }) {
    try {
      const value = validateInput({ category_name, product_ids });
      const result = await categoryData.addCategory({
        category_name: value.category_name,
        product_ids: value.product_ids,
      });
      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ category_name, product_ids }) {
    const schema = Joi.object({
      category_name: Joi.string().trim().required(),
      product_ids: Joi.string().trim().guid(),
    });

    const { error, value } = schema.validate({ category_name, product_ids });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
