module.exports = function makeGetCompanyByNameAction({ getCompanyByName }) {
  return async function getCompanyByNameAction(req, res) {
    try {
      const name = req.params.name;
      const result = await getCompanyByName({ name });
      res.status(200).json({
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
