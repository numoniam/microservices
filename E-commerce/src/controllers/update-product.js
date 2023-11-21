module.exports = function makeUpdateProductAction({ updateProduct }) {
  return async function updateProductAction(req, res) {
    try {
      const id = req.params.id;
      const updateProductData = req.body;
      const result = await updateProduct({ id, updateProductData });
      res.status(201).json({
        status: "success",
        result: result,
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
