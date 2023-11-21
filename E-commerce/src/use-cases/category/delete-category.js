module.exports = function makeDeleteCategory({
  categoryData,
  productData,
  Joi,
}) {
  return async function deleteCategory({ id }) {
    try {
      const value = validateInput({ id });

      const result = await categoryData.deleteCategory({ id: value.id });
      //all the product retatde to same category are deleted
      await productData.deleteProductsByCategoryId({ id: value.id });
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
