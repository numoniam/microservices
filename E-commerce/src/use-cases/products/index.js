const Joi = require("@hapi/joi");
const { productData, categoryData } = require("../../data-access");

const makeAddProductInCategory = require("./add-product-in-category");
const addProductInCategory = makeAddProductInCategory({
  productData,
  categoryData,
  Joi,
});

const makeDeleteProductInCategory = require("./delete-product-in-category");
const deleteProductInCategory = makeDeleteProductInCategory({
  productData,
  categoryData,
  Joi,
});

const makeAddProdut = require("./add-product");
const addProduct = makeAddProdut({ productData, addProductInCategory, Joi });

const makeGetProduct = require("./get-product");
const getProduct = makeGetProduct({ productData, Joi });

const makeDeleteProduct = require("./delete-product");
const deleteProduct = makeDeleteProduct({
  productData,
  deleteProductInCategory,
  Joi,
});

const makeGetAllProduct = require("./get-all-product");
const getAllProduct = makeGetAllProduct({ productData });

const makeUpdateProdut = require("./update-product");
const updateProduct = makeUpdateProdut({ productData, Joi });

const makeProductSearch = require("./product-search");
const productSearch = makeProductSearch({ productData, Joi });

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  productSearch,
};
