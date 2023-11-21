module.exports = function makeCreateEmployee({
  employeeDb,
  allRolesDb,
  employeeRolesDb,
  getCompanyId,
  Joi,
}) {
  return async function createEmployee({
    companyName,
    companyId,
    name,
    email,
    salary,
    role,
  }) {
    try {
      const validateData = validateInput({
        companyName,
        companyId,
        name,
        email,
        salary,
        role,
      });
      //if we pass the company name
      if (validateData.companyName) {
        // internal service call
        validateData.companyId = await getCompanyId({
          companyName: validateData.companyName,
        });
      }
      const employeeData = await employeeDb.createEmployee({
        companyId: validateData.companyId,
        name: validateData.name,
        email: validateData.email,
        salary: validateData.salary,
        role: validateData.role,
      });

      //permission object
      const permissions = {
        employee: {
          get: true,
          create: true,
          update: true,
          delete: true,
        },
        role: {
          get: true,
          create: true,
          update: true,
          delete: true,
        },
        assign: {
          create: true,
          delete: true,
          get: true,
        },
      };

      //check if its owner user than it will create permission and role
      if (employeeData.role == "owner") {
        //create role
        const roleId = await allRolesDb.createRole({
          role: employeeData.role,
          id: employeeData.company_id,
          permissions,
        });
  
        //assign role to employee
        await employeeRolesDb.assignRole({
          employeeId: employeeData.id,
          roleId,
        });
      }
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({
    companyName,
    companyId,
    name,
    email,
    salary,
    role,
  }) {
    const schema = Joi.object({
      companyName: Joi.string().trim().optional(),
      companyId: Joi.string().trim().guid().optional(),
      name: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      salary: Joi.number().integer().positive().required(),
      role: Joi.string().trim().required(),
    });

    const { error, value } = schema.validate({
      companyName,
      companyId,
      name,
      email,
      salary,
      role,
    });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
