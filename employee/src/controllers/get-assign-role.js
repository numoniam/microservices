module.exports = function makeGetAssignRoleAction({ getAssignRole }) {
    return async function getAssignRoleAction(req, res) {
      try {
        const id = req.params.id;
        const result=await getAssignRole({ id });
        res.status(201).json({
          status: "success",
          data: {
            item: result,
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
  