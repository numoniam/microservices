module.exports = function makeAddProductAction({ addProduct }) {
  return async function addProductAction(req, res) {
    try {
      const { product_name, category_id } = req.body;
      const result = await addProduct({ product_name, category_id });
      res.status(201).json({
        status: "success",
        result:result
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    }
  };
};
