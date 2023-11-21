module.exports = function makeGetCompanyByName({ companyDb, Joi }) {
  return async function getCompanyByName({ name }) {
    try {
      const value = validateInput({ name });
      const result = await companyDb.getCompanyByName({ name: value.name });
      if (!result) {
        throw new Error("Company data not found");
      }
      return result;
    } catch (err) {
      throw err.message;
    }
  };

  function validateInput({ name }) {
    const schema = Joi.object({
      name: Joi.string().trim().min(3).max(50).required(),
    });
    const { error, value } = schema.validate({ name });
    if (error) {
      throw error.details[0];
    }
    return value;
  }
};
