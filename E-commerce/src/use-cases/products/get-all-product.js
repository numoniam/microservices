module.exports = function makeGetAllProduct({ productData }) {
  return async function getAllProduct() {
    try {
      return await productData.getAllProduct();
    } catch (err) {
      throw err.message;
    }
  };
};
