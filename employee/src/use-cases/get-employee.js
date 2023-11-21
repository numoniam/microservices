module.exports = function makeGetEmployee({
  employeeDb,
  getCompanyDetail,
  Joi,
}) {
  return async function getEmployee({ id }) {
    try {
      const value=validateInput({ id });
      const employeeDetail = await employeeDb.getEmployee({ id:value.id });
      if(!employeeDetail){
        throw new Error("Employee data not found");
      }

      //internal service call for getting company information
      const companyDetail = await getCompanyDetail({
        id: employeeDetail[0].company_id,
      });

      //remove company id from company Detail
      delete companyDetail.id;

      //remove company id from employee Detail
      delete employeeDetail[0].company_id;

      employeeDetail[0].companyDetail = companyDetail;
      return employeeDetail;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ id }) {
    const schema = Joi.object({
      id: Joi.string().trim().guid().required(),
    });
    const { error,value } = schema.validate({ id });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
