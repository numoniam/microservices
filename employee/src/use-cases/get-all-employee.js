module.exports = function makeGetAllEmployee({ employeeDb}) {
    return async function getAllEmployee() {
      try {
        return await employeeDb.getAllEmployee();
      } catch (err) {
        throw err.message;
      }
    };
  };
  