module.exports = function makeDeleteProductInCategory({
  productData,
  categoryData,
  Joi,
}) {
  return async function deleteProductInCategory({ product_id }) {
    try {
      const value = validateInput({ product_id });

      //get category id
      const category_id = await productData.getCategoryId({
        product_id: value.product_id,
      });

      if (!category_id) {
        throw new Error("Category Id not found from product");
      }
      //fetch Product_ids from category collection
      const product_ids = await categoryData.fetchProductIdsFromCategory({
        category_id,
      });
      if (!product_ids) {
        throw new Error("Product Ids not found from category");
      }
      //remove the specific id from array
      const filtered_ids = product_ids.filter((id) => id !== product_id);
    
      //update the poducts_ids
      const newProductIdsArr = { product_ids: filtered_ids };

      await categoryData.updateCategory({
        id: category_id,
        updateCategoryData: newProductIdsArr,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ product_id }) {
    const schema = Joi.object({
      product_id: Joi.string().trim().guid().required(),
    });
    const { error, value } = schema.validate({ product_id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
