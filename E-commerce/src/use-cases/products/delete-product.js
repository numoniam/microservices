module.exports = function makeDeleteProduct({
  productData,
  deleteProductInCategory,
  Joi,
}) {
  return async function deleteProduct({ id }) {
    try {
      const value = validateInput({ id });
      
      //delete product id from category collection
      await deleteProductInCategory({ product_id: value.id });
      
      const result = await productData.deleteProduct({ id: value.id });


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
