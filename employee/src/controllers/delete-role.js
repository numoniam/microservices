module.exports = function makeDeleteRoleAction({ deleteRole }) {
    return async function deleteRoleAction(req, res) {
      try {
        const id = req.params.id;
        await deleteRole({ id });
        res.status(201).json({
          status: "success",
          data: {
            message: "Role data Deleted Successfully",
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
  