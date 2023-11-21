module.exports = function makeUpdateCategoryAction({ updateCategory }) {
    return async function updateCategoryAction(req, res) {
      try {
        const id = req.params.id;
        const updateCategoryData = req.body;
        const result = await updateCategory({ id, updateCategoryData });
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
  