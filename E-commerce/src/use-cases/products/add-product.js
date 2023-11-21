module.exports = function makeAddProdut({
  productData,
  addProductInCategory,
  Joi,
}) {
  return async function addProduct({ product_name, category_id }) {
    try {
      const value = validateInput({ product_name, category_id });
      const result = await productData.addProduct({
        product_name: value.product_name,
        category_id: value.category_id,
      });
    
      //adding the product id into the category
      await addProductInCategory({
        product_name: value.product_name,
        category_id: value.category_id,
      });
      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ product_name, category_id }) {
    const schema = Joi.object({
      product_name: Joi.string().trim().required(),
      category_id: Joi.string().trim().guid(),
    });

    const { error, value } = schema.validate({ product_name, category_id });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
