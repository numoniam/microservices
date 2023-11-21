module.exports = function makeGetAllCategory({ categoryData }) {
    return async function getAllCategory() {
      try {
        return await categoryData.getAllCategory();
      } catch (err) {
        throw err.message;
      }
    };
  };
  