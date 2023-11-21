const {
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
  categorySearch,
} = require("../use-cases");

const makeAddProductAction = require("./add-product");
const addProductAction = makeAddProductAction({ addProduct });

const makeGetProductAction = require("./get-product");
const getProductAction = makeGetProductAction({ getProduct });

const makeDeleteProductAction = require("./delete-product");
const deleteProductAction = makeDeleteProductAction({ deleteProduct });

const makeGetAllProductAction = require("./get-all-product");
const getAllProductAction = makeGetAllProductAction({ getAllProduct });

const makeUpdateProductAction = require("./update-product");
const updateProductAction = makeUpdateProductAction({ updateProduct });

//category

const makeAddCategoryAction = require("./add-category");
const addCategoryAction = makeAddCategoryAction({ addCategory });

const makeGetCategoryAction = require("./get-category");
const getCategoryAction = makeGetCategoryAction({ getCategory });

const makeGetAllCategoryAction = require("./get-all-category");
const getAllCategoryAction = makeGetAllCategoryAction({ getAllCategory });

const makeDeleteCategoryAction = require("./delete-category");
const deleteCategoryAction = makeDeleteCategoryAction({ deleteCategory });

const makeUpdateCategoryAction = require("./update-category");
const updateCategoryAction = makeUpdateCategoryAction({ updateCategory });

//search

const makeProductSearchAction = require("./product-search");
const productSearchAction = makeProductSearchAction({ productSearch });

const makeCategorySearchAction = require("./category-search");
const categorySearchAction = makeCategorySearchAction({ categorySearch });

module.exports = {
  addProductAction,
  getProductAction,
  deleteProductAction,
  getAllProductAction,
  updateProductAction,
  addCategoryAction,
  getCategoryAction,
  getAllCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
  productSearchAction,
  categorySearchAction,
};
