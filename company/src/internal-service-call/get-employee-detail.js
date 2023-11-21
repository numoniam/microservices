module.exports = function makeGetEmployeeDetail({ axios, serviceEndpoints }) {
  return async function getEmployeeDetail({ id }) {
    try {
      const response = await axios({
        method: "get",
        url: `${serviceEndpoints.getEmployeeDetail}/${id}`,
      });

      const employeeDetail = response.data;

      if (employeeDetail.data.items.length === 0) {
        throw new Error("Employee data not found");
      }
      return employeeDetail.data.items;
    } catch (err) {
      throw err;
    }
  };
};
