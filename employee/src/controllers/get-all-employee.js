module.exports = function makeGetAllEmployeeAction({getAllEmployee}) {
    return async function getAllEmployeeAction(req, res) {
      try {
        const result=await getAllEmployee();
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
            error:err
          },
        });
      }
    };
  };
  
  