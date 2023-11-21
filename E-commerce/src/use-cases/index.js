const {
  addProduct,
  getProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  productSearch
} = require("./products");

const {
  addCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  categorySearch
} = require("./category");

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  addCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  productSearch,
  categorySearch
};
