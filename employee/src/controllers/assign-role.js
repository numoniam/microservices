module.exports = function makeAssignRoleAction({ assignRole }) {
  return async function assignRoleAction(req, res) {
    try {
      const { employeeId, roleId } = req.body;
      await assignRole({ employeeId, roleId });
      res.status(201).json({
        status: "success",
        data: {
          message: "Role assigend successfully",
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
