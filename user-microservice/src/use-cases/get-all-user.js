module.exports = function makeGetAllUser({ userDataDb }) {
  return async function getAllUser() {
    try {
      return await userDataDb.getAllUser();
    } catch (err) {
      throw err.message;
    }
  };
};
