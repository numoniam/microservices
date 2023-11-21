module.exports = function makeUpdateCategory({ categoryData, Joi }) {
  return async function updateCategory({ id, updateCategoryData }) {
    try {
      const value = validateInput({ id, updateCategoryData });
      const result = await categoryData.updateCategory({
        id: value.id,
        updateCategoryData: value.updateCategoryData,
      });

      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id, updateCategoryData }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
      updateCategoryData: Joi.object({
        category_name: Joi.string().trim().optional(),
        product_ids: Joi.array().items(Joi.string().guid()),
      }).or("category_name", "product_ids"),
    });

    const { error, value } = schema.validate({ id, updateCategoryData });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
