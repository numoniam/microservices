module.exports = function makeGetCompanyDetail({ axios, serviceEndpoints }) {
  return async function getCompanyDetail({ id }) {
    try {
      const response = await axios({
        method: "get",
        url: `${serviceEndpoints.getCompanyDetail}/${id}`,
      });
      const companyDetail = response.data;
      // console.log(companyDetail.data.item.companyDetail[0]);
      if (companyDetail.data.item.companyDetail.length === 0) {
        throw new Error("Company data not found");
      }
      return companyDetail.data.item.companyDetail[0];
    } catch (err) {
      throw err;
    }
  };
};
