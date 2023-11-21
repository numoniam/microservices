module.exports = function makeAddProductInCategory({
  productData,
  categoryData,
  Joi,
}) {
  return async function addProductInCategory({ product_name, category_id }) {
    try {
      const value = validateInput({ product_name, category_id });

      //get product id from product name
      const product_Id = await productData.getProductIdByName({
        product_name: value.product_name,
      });
      if (!product_Id) {
        throw new Error("Product Id not found");
      }
      
      //adding into the category product_ids
      await categoryData.addProductIdInCategory({
        product_Id,
        category_id: value.category_id,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ product_name, category_id }) {
    const schema = Joi.object({
      product_name: Joi.string().trim().required(),
      category_id: Joi.string().trim().guid().required(),
    });
    const { error, value } = schema.validate({ product_name, category_id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
