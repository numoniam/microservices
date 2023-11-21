module.exports = function makeGetAllRole({ allRolesDb }) {
  return async function getAllRole() {
    try {
      return await allRolesDb.getAllRole();
    } catch (err) {
      throw err.message;
    }
  }
};
