const TABLE_NAME = "allroles";
function makeAllRolesDb({ cockroach }) {
  return Object.freeze({
    createRole,
    getRole,
    getAllRole,
    deleteRole,
    updateRole,
    deleteRoleById,
    isRoleExistById,
  });

  async function createRole({ role, id, permissions }) {
    try {
      const db = await cockroach.connect();
      const permissionInToString = JSON.stringify(permissions);
      const result = await db.query(
        `INSERT INTO ${TABLE_NAME} (company_id,role,permissions) values($1,$2,$3) RETURNING id`,
        [id, role, permissionInToString]
      );
      return result.rows[0].id;
    } catch (err) {
      throw err;
    }
  }

  async function getRole({ id }) {
    try {
      const db = await cockroach.connect();

      const roleData = await db.query(
        `SELECT * FROM ${TABLE_NAME} WHERE id=$1`,
        [id]
      );

      const result = roleData.rows;

      if (!result || !result.length) {
        return false;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function getAllRole() {
    try {
      const db = await cockroach.connect();

      const rolesData = await db.query(`SELECT * FROM ${TABLE_NAME}`);

      const result = rolesData.rows;

      if (!result || !result.length) {
        return [];
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function deleteRole({ id }) {
    try {
      const db = await cockroach.connect();

      await db.query(`DELETE FROM ${TABLE_NAME} WHERE id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  }

  async function updateRole({ roleUpdateData, id }) {
    try {
      const db = await cockroach.connect();

      const columnName = Object.keys(roleUpdateData);
      const columnValue = Object.values(roleUpdateData);
      const queryColumn = columnName.join(", ");

      let executeQuery = `UPDATE ${TABLE_NAME} SET (${queryColumn}) = (`;

      //adding $ in query
      for (let i = 1; i <= columnValue.length; i++) {
        executeQuery += `$${i},`;
      }
      //remove extra "," at the end
      executeQuery = executeQuery.slice(0, executeQuery.length - 1);
      //adding "ID"
      executeQuery += `) WHERE id = $${columnValue.length + 1}`;
      //push ID value into array
      columnValue.push(id);
      //execute the query
      await db.query(executeQuery, columnValue);
    } catch (err) {
      throw err;
    }
  }

  async function deleteRoleById({ id }) {
    try {
      const db = await cockroach.connect();

      await db.query(`DELETE FROM ${TABLE_NAME} WHERE company_id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  }

  async function isRoleExistById({ id }) {
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE id = $1`,
        [id]
      );
      const roleExist = result.rowCount > 0; // Check if any rows were returned
      return roleExist;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = makeAllRolesDb;
