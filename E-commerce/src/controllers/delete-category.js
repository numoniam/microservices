module.exports = function makeDeleteCategoryAction({ deleteCategory }) {
  return async function deleteCategoryAction(req, res) {
    try {
      const id = req.params.id;
      const result = await deleteCategory({ id });
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
