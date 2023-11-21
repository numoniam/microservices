module.exports = function makeGetRoleAction({ getRole }) {
  return async function getRoleAction(req, res) {
    try {
      const id = req.params.id;
      const result = await getRole({ id });
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
