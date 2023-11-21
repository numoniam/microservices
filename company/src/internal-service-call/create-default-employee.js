module.exports = function makeCreateDefaultEmployee({
  axios,
  serviceEndpoints,
}) {
  return async function createDefaultEmployee({ id }) {
    try {
      await axios({
        method: "post",
        url: `${serviceEndpoints.createDefaultEmployee}`,
        data: {
          companyId: id,
          name: "defaultUser",
          email: "defaultUser@gmail.com",
          salary: 100000,
          role: "owner",
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
