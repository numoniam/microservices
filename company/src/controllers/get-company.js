module.exports = function makeGetCompanyAction({getCompany}) {
    return async function getCompanyAction(req, res) {
      try {
        const id = req.params.id;
        const result=await getCompany({id});
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
            error:err
          },
        });
      }
    };
  };
  
  