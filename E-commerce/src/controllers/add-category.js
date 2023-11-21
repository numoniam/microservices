module.exports = function makeAddCategoryAction({ addCategory }) {
    return async function addCategoryAction(req, res) {
      try {
        const { category_name, product_ids } = req.body;
        const result = await addCategory({ category_name, product_ids });
        
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
  