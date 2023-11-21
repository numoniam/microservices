const Joi = require("@hapi/joi");
const { categoryData, productData } = require("../../data-access");

const makeAddCategory = require("./add-category");
const addCategory = makeAddCategory({ categoryData, Joi });

const makeGetCategory = require("./get-category");
const getCategory = makeGetCategory({ categoryData, Joi });

const makeGetAllCategory = require("./get-all-category");
const getAllCategory = makeGetAllCategory({ categoryData });

const makeDeleteCategory = require("./delete-category");
const deleteCategory = makeDeleteCategory({ categoryData, productData, Joi });

const makeUpdateCategory = require("./update-category");
const updateCategory = makeUpdateCategory({ categoryData, Joi });

const makeCategorySearch = require("./category-search");
const categorySearch = makeCategorySearch({ categoryData, Joi });

module.exports = {
  addCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  categorySearch
};
