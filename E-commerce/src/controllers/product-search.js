module.exports = function makeProductSearchAction({ productSearch }) {
  return async function productSearchAction(req, res) {
    try {
      const { product_name,order } = req.body;
      const result = await productSearch({ product_name,order });
      res.status(201).json({
        status: "success",
        items: result,
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
