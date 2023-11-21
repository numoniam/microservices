module.exports = function makeValidateMiddleware({ validatePermission }) {
  return async function validateMiddlewar({
    req,
    res,
    next,
    public,
    permissions,
  }) {
    try {
      if (public) {
        next();
      } else {
        const route = permissions.split(".")[0];
        const method = permissions.split(".")[1];

        const { authorization } = req.headers;

        const employeeId = authorization.split(" ")[1];
        // console.log(employeeId);

        const result = await validatePermission({ route, method, employeeId });

        if (result) {
          next();
        } else {
          throw new Error("you have not permission to access this route");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        data: {
          error: err.message,
        },
      });
    }
  };
};
