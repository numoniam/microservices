module.exports = function makeCategorySearch({ categoryData, Joi }) {
  return async function categorySearch({ category_name, order }) {
    try {
      const value = validateInput({ category_name, order });
      return await categoryData.categorySearch({
        category_name: value.category_name,
        order: value.order,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ category_name, order }) {
    const schema = Joi.object({
      category_name: Joi.string().trim().required(),
      order: Joi.string().valid("asc", "desc").optional(),
    });
    const { error, value } = schema.validate({ category_name, order });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
