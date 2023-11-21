module.exports = function makeRevokePermissionAction({ revokePermission }) {
    return async function revokePermissionAction(req, res) {
      try {
        const id = req.params.id;
        console.log(id);
        await revokePermission({ id });
        res.status(201).json({
          status: "success",
          data: {
            message: "Revoked permission successfully",
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
  