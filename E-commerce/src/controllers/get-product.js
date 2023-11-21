module.exports = function makeGetProductAction({ getProduct }) {
  return async function getProductAction(req, res) {
    try {
      const id = req.params.id;
      const result = await getProduct({ id });
      res.status(201).json({
        status: "success",
        item: result,
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
