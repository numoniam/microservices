module.exports = function makeUpdateUserAction({ updateUser }) {
  return async function updateUserAction(req, res) {
    try {
      const id = req.params.id;
      const userUpdateData = req.body;
      await updateUser({ userUpdateData, id });
      res.status(201).json({
        status: "success",
        data: {
          message: "User Data Updated successfully...",
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
