module.exports = function makeGetEmployeeAction({getEmployee}) {
    return async function getEmployeeAction(req, res) {
      try {
        const id = req.params.id;
        const result=await getEmployee({id});
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
  
  