module.exports = function makeCreateEmployeeAction({createEmployee}) {
    return async function createEmployeeAction(req, res) {
      try {
        const {companyName,companyId,name,email,salary,role} = req.body;
        await createEmployee({companyName,companyId,name,email,salary,role});
        res.status(201).json({
          status: "success",
          data: {
            message: "Employee data created successfully",
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
  
  