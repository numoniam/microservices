module.exports = function makeGetCompany({
  companyDb,
  getEmployeeDetail,
  Joi,
}) {
  return async function getCompany({ id }) {
    try {
      const value = validateInput({ id });
    
      const companyDetail = await companyDb.getCompany({ id: value.id });
      if (!companyDetail) {
        throw new Error("Company data not found");
      }

      //internal service call for employee details
      const companyAllEmployee = await getEmployeeDetail({
        id: companyDetail[0].id,
      });
      
      //add employee into company detail object
      companyDetail[0].employee = companyAllEmployee;

      const finalObj = {
        companyDetail: companyDetail,
      };
      return finalObj;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
    });
    const { error, value } = schema.validate({ id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
