module.exports = function makeUpdateRoleAction({ updateRole }) {
  return async function updateRoleAction(req, res) {
    try {
      const id = req.params.id;
      const roleUpdateData = req.body;
      await updateRole({ roleUpdateData, id });
      res.status(201).json({
        status: "success",
        data: {
          message: "Role Updated successfully",
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
