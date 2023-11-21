module.exports = function makeGetAllRoleAction({ getAllRole }) {
  return async function getAllRoleAction(req, res) {
    try {
      const result = await getAllRole();
      res.status(201).json({
        status: "success",
        data: {
          message: result,
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
