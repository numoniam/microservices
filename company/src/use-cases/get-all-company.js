module.exports = function makeGetAllCompany({ companyDb }) {
  return async function getAllCompany() {
    try {
      const companysData = await companyDb.getAllCompany();
      // if (companysData.length === 0) {
      //   throw new Error("Companys data not found");
      // }
      return companysData;
    } catch (err) {
      throw err.message;
    }
  };
};
