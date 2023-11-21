module.exports = function makeCreateCompany({
  companyDb,
  createDefaultEmployee,
  Joi,
}) {
  return async function createCompany({ name, contact, city, address }) {
    try {
      const value = validateInput({ name, contact, city, address });

      //check if name is alredy available or not
      const isCompanyExist = await companyDb.isCompanyExistByName({ name });
      if (isCompanyExist) {
        throw new Error("User with the same name is already exists");
      }

      //if name is not available in databse than create company
      const result = await companyDb.createCompany({
        name: value.name,
        contact: value.contact,
        city: value.city,
        address: value.address,
      });
      //internal service call for creating default user
      await createDefaultEmployee({ id: result.id });
      return result;
    } catch (err) { 
      throw err.message;
    }
  };

  function validateInput({ name, contact, city, address }) {
    const schema = Joi.object({
      name: Joi.string().trim().min(3).max(50).required(),
      contact: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .required(),
      city: Joi.string().trim().min(2).max(50).required(),
      address: Joi.string().trim().min(5).max(100).required(),
    });

    const { error, value } = schema.validate({
      name,
      contact,
      city,
      address,
    });

    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
