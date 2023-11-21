module.exports = function makeGetAllCategoryAction({ getAllCategory }) {
    return async function getAllCategoryAction(req, res) {
      try {
        const result = await getAllCategory();
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
  