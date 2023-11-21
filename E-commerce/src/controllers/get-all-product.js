module.exports = function makeGetAllProductAction({ getAllProduct }) {
    return async function getAllProductAction(req, res) {
      try {
        const result = await getAllProduct();
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
  