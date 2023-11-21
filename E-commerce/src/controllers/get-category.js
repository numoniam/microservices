module.exports = function makeGetCategoryAction({ getCategory }) {
    return async function getCategoryAction(req, res) {
      try {
        const id = req.params.id;
        const result = await getCategory({ id });
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
  