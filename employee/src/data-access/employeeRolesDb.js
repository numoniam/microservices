const TABLE_NAME = "employeeroles";
function makeEmployeeRolesDb({ cockroach }) {
  return Object.freeze({
    assignRole,
    revokePermission,
    getAssignRole,
    isRoleExistById
  });

  async function assignRole({ employeeId, roleId }) {
    try {
      await cockroach.query(
        `INSERT INTO ${TABLE_NAME} (role_id,employee_id) values($1,$2)`,
        [roleId, employeeId]
      );
    } catch (err) {
      throw err;
    }
  }

  async function revokePermission({ id }) {
    try {
      await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE role_id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  }

  async function getAssignRole({ id }) {
    try {
      const assignRoleData = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE employee_id=$1`,
        [id]
      );
      const result = assignRoleData.rows;

      if (!result || !result.length) {
        return false
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function isRoleExistById({id}){
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE role_id = $1`,
        [id]
      );
      const employeeExist = result.rowCount > 0; // Check if any rows were returned
      return employeeExist;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeEmployeeRolesDb;
