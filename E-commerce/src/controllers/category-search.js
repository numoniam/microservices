module.exports = function makeCategorySearchAction({ categorySearch }) {
  return async function categorySearchAction(req, res) {
    try {
      const { category_name, order } = req.body;
      const result = await categorySearch({ category_name, order });
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
