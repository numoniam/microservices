module.exports = function makeValidatePermission({
  employeeRolesDb,
  allRolesDb,
  Joi,
}) {
  return async function validatePermission({ route, method, employeeId }) {
    try {
      //this usecase of validation of middleware and return the true adn false value accordingly
      validateInput({ route, method, employeeId });
      const assigndRoleData = await employeeRolesDb.getAssignRole({ id: employeeId }); //employee ID

      //check if we get rany role
      if (assigndRoleData.length == 0) {
        return false;
      }
      const roleData = await allRolesDb.getRole({ id: assigndRoleData[0].role_id }); //role ID

      //convert permission  JSON object into object
      const permissionObj = JSON.parse(roleData[0].permissions);
      const routeArr = Object.keys(permissionObj);
      //   console.log(routeArr.includes(route));

      if (!routeArr.includes(route)) {
        return false;
      }

      //check the methode include in route array
      const methodArr = Object.keys(permissionObj[route]);
      if (methodArr.includes(method)) {
        return true;
      }
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ route, method, employeeId }) {
    const schema = Joi.object({
      route: Joi.string().required(),
      method: Joi.string().required(),
      employeeId: Joi.string().guid().required(),
    });
    const { error } = schema.validate({ route, method, employeeId });
    if (error) {
      throw error.details[0];
    }
  }
};
