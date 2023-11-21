module.exports = function makeGetAllUserAction({ getAllUser }) {
    return async function getAllUserAction(req, res) {
      try {
        const result = await getAllUser();
        res.status(201).json({
          status: "success",
          data: {
            items: result,
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
  