module.exports = function makeDeleteUserAction({ deleteUser }) {
  return async function deleteUserAction(req, res) {
    try {
      const id = req.params.id;
      await deleteUser({ id });
      res.status(201).json({
        status: "success",
        data: {
          message: "User data deleted successfull",
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
