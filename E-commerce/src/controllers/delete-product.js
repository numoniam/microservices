module.exports = function makeDeleteProductAction({ deleteProduct }) {
  return async function deleteProductAction(req, res) {
    try {
      const id = req.params.id;
      const result = await deleteProduct({ id });
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
