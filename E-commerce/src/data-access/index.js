const axios = require("axios");
const config=require("../config/service-endpoints")

const makeProductData = require("./product");
const productData = makeProductData({ axios,config });

const makeCategoryData = require("./category");
const categoryData = makeCategoryData({ axios,config });

const collection = {
  productData,
  categoryData
};

module.exports = collection;
