module.exports = function makeUpdateEmployeeAction({ updateEmployee }) {
    return async function updateEmployeeAction(req, res) {
      try {
        const id = req.params.id;
        const employeeUpdateData = req.body;
        await updateEmployee({ employeeUpdateData, id });
        res.status(200).json({
          status: "success",
          data: {
            message: "Employee data updated successfully",
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
  