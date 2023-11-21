const TABLE_NAME = "company";
function makeCompanyDb({ cockroach }) {
  return Object.freeze({
    createCompany,
    getAllCompany,
    getCompany,
    deleteCompany,
    updateCompany,
    getCompanyByName,
    isCompanyExistByName,
    isCompanyExistById,
  });

  async function createCompany({ name, contact, city, address }) {
    try {
      const result = await cockroach.query(
        `INSERT INTO ${TABLE_NAME} (name,contact,city,address) values($1,$2,$3,$4) RETURNING id`,
        [name, contact, city, address]
      );

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async function getAllCompany() {
    try {
      const companysData = await cockroach.query(`SELECT * FROM ${TABLE_NAME}`);

      const result = companysData.rows;

      if (!result || !result.length) {
        return [];
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function getCompany({ id }) {
    try {
      const companyData = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE id=$1`,
        [id]
      );

      const result = companyData.rows;

      if (!result || !result.length) {
        return false;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function deleteCompany({ id }) {
    try {
      await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  }

  async function updateCompany({ updateCompanyData, id }) {
    try {
      //making query
      const columnName = Object.keys(updateCompanyData);
      const columnValue = Object.values(updateCompanyData);
      const queryColumn = columnName.join(", ");

      let executeQuery = `UPDATE ${TABLE_NAME} SET (${queryColumn}) = (`;

      for (let i = 1; i <= columnValue.length; i++) {
        executeQuery += `$${i},`;
      }
      //remove extra "," from query
      executeQuery = executeQuery.slice(0, executeQuery.length - 1);
      //adding ID and remaining query part
      executeQuery += `) WHERE id = $${columnValue.length + 1}`;
      //push ID value into array
      columnValue.push(id);
      //execute the query
      await cockroach.query(executeQuery, columnValue);
    } catch (err) {
      throw err;
    }
  }

  async function getCompanyByName({ name }) {
    try {
      const companyData = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE name=$1`,
        [name]
      );

      const result = companyData.rows;

      if (!result || !result.length) {
        return false;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function isCompanyExistByName({ name }) {
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE name = $1`,
        [name]
      );
      const nameExists = result.rowCount > 0; // Check if any rows were returned
      return nameExists;
    } catch (err) {
      throw err;
    }
  }

  async function isCompanyExistById({ id }) {
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE id = $1`,
        [id]
      );
      const companyExists = result.rowCount > 0; // Check if any rows were returned
      return companyExists;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = makeCompanyDb;
