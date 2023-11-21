module.exports = function makeCreateUserAction({ createUser }) {
  return async function createUserAction(req, res) {
    try {
      const { name, email, password } = req.body;
      const result = await createUser({ name, email, password });
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
