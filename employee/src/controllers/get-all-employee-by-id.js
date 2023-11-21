module.exports = function makeGetAllEmployeeByIdAction({ getAllEmployeeById }) {
  return async function getAllEmployeeByIdAction(req, res) {
    try {
      const id = req.params.id;
      const result = await getAllEmployeeById({ id });
      res.status(200).json({
        status: "success",
        data: {
          items: result,
        },
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
