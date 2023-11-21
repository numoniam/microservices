const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router
  .post("/product", controllers.addProductAction)
  .get("/product/:id", controllers.getProductAction)
  .post("/product/:id", controllers.deleteProductAction)
  .get("/product", controllers.getAllProductAction)
  .patch("/product/:id", controllers.updateProductAction)
  .post("/category", controllers.addCategoryAction)
  .get("/category/:id", controllers.getCategoryAction)
  .get("/category", controllers.getAllCategoryAction)
  .post("/category/:id", controllers.deleteCategoryAction)
  .patch("/category/:id", controllers.updateCategoryAction)
  .post("/search/product", controllers.productSearchAction)
  .post("/search/category",controllers.categorySearchAction)

module.exports = router;
