const TABLE_NAME = "userdata";
function makeUserDataDb({ cockroach }) {
  return Object.freeze({
    createUser,
    getUser,
    getAllUser,
    deleteUser,
    updateUser,
    isValidEmail,
    isUserExistById,
    isUserExistByEmail,
  });

  async function createUser({ name, email, password }) {
    try {
      const result = await cockroach.query(
        `INSERT INTO ${TABLE_NAME} (name,email,password) values($1,$2,$3) RETURNING id`,
        [name, email, password]
      );

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async function getUser({ id }) {
    try {
      const userData = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE id=$1`,
        [id]
      );

      const result = userData.rows;

      if (!result || !result.length || result.length == 0) {
        return false;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function getAllUser() {
    try {
      const userData = await cockroach.query(`SELECT * FROM ${TABLE_NAME}`);

      const result = userData.rows;

      if (!result || !result.length || result.length == 0) {
        return [];
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function deleteUser({ id }) {
    try {
      await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE id=$1 `, [id]);
    } catch (err) {
      throw err;
    }
  }

  async function updateUser({ userUpdateData, id }) {
    try {
      //making query
      const columnName = Object.keys(userUpdateData);
      const columnValue = Object.values(userUpdateData);
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

  async function isValidEmail({ email }) {
    try {
      const userData = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE email=$1`,
        [email]
      );

      const result = userData.rows;

      if (!result || !result.length || result.length == 0) {
        return false;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function isUserExistById({ id }) {
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE id = $1`,
        [id]
      );
      const userExist = result.rowCount > 0; // Check if any rows were returned
      return userExist;
    } catch (err) {
      throw err;
    }
  }

  async function isUserExistByEmail({ email }) {
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE email = $1`,
        [email]
      );
      const userExist = result.rowCount > 0; // Check if any rows were returned
      return userExist;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = makeUserDataDb;
