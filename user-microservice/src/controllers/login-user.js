module.exports = function makeLoginUserAction({ loginUser }) {
  return async function loginUserAction(req, res) {
    try {
      const { email, password } = req.body;
      await loginUser({ email, password });
      res.status(201).json({
        status: "success",
        data: {
          message: "User Logged in successfully",
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
