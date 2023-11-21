module.exports = function makeUpdateCompany({ companyDb, Joi }) {
  return async function updateCompany({ updateCompanyData, id }) {
    try {
      const values = validateInput({ updateCompanyData, id });

      //do check if company exist by ID
      const companyExist = await companyDb.isCompanyExistById({ id });
      if (!companyExist) {
        throw new Error("Company Dose Not Exist");
      }
     
  
      //check if name alredy exist or not
      if (values.updateCompanyData.name) {
        const nameExist = await companyDb.isCompanyExistByName({
          name: values.updateCompanyData.name,
        });
        if (nameExist) {
          throw new Error(
            "Company Name already use please take any other unique name"
          );
        }
      }
  
      await companyDb.updateCompany({
        updateCompanyData: values.updateCompanyData,
        id: values.id,
      });
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ updateCompanyData, id }) {
    const schema = Joi.object({
      updateCompanyData: Joi.object({
        name: Joi.string().trim().min(3).max(50).optional(),
        contact: Joi.number()
          .integer()
          .min(1000000000)
          .max(9999999999)
          .optional(),
        city: Joi.string().trim().min(2).max(50).optional(),
        address: Joi.string().trim().min(5).max(100).optional(),
      }).or("name", "contact", "city", "address"),
      id: Joi.string().guid().required(),
    });

    const { error, value } = schema.validate({
      updateCompanyData,
      id,
    });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
