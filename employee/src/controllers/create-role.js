module.exports = function makeCreateRoleAction({createRole}) {
    return async function createRoleAction(req, res) {
      try {
        const id = req.params.id;
        const {role,permissions}=req.body
        await createRole({role,id,permissions});
        res.status(201).json({
          status: "success",
          data: {
            message: "Role created successfully",
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
  
  