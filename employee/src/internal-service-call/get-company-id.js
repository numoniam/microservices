module.exports = function makeGetCompanyId({ axios,serviceEndpoints }) {
  return async function getCompanyId({ companyName }) {
    try {
      const response = await axios({
        method: "get",
        url:`${serviceEndpoints.getCompanyId}/${companyName}`
    });
      const companies = response.data;

      // console.log(companies.data.item.length);
      if (companies.data.item.length === 0) {
        throw new Error("Company data not found");
      }
      // console.log(companies.data.item[0].id);
      return companies.data.item[0].id;
    } catch (err) {
      throw err;
    }
  };
};
