module.exports = function makeGetAllCompanyAction({ getAllCompany }) {
  return async function getAllCompanyAction(req, res) {
    try {
      const result = await getAllCompany();
      res.status(200).json({
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
