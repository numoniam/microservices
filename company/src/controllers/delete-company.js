module.exports = function makeDeleteCompanyAction({ deleteCompany }) {
  return async function deleteCompanyAction(req, res) {
    try {
      const id = req.params.id;
      await deleteCompany({ id });
      res.status(200).json({
        status: "success",
        data: {
          message: "company data deleted successfully",
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
