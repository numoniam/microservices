module.exports = function makeGetUserAction({ getUser }) {
    return async function getUserAction(req, res) {
      try {
        const id = req.params.id;
        const result = await getUser({ id });
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
  