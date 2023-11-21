module.exports = function makeDeleteEmployeeAction({ deleteEmployee }) {
    return async function deleteEmployeeAction(req, res) {
      try {
        const id = req.params.id;
        await deleteEmployee({ id });
        res.status(200).json({
          status: "success",
          data: {
            message: "Employee data deleted successfully",
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
  