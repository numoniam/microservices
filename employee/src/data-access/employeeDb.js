const TABLE_NAME = "employee";
function makeEmployeeDb({ cockroach }) {
  return Object.freeze({
    createEmployee,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    getAllEmployee,
    getAllEmployeeById,
    deleteEmployeeById,
    isEmployeeExistById,
  });

  async function createEmployee({ companyId, name, email, salary, role }) {
    try {
      const result = await cockroach.query(
        `INSERT INTO ${TABLE_NAME} (company_id,name,email,salary,role) values($1,$2,$3,$4,$5) RETURNING id,company_id,role `,
        [companyId, name, email, salary, role]
      );
      // const employeeData = result.rows;

      // if (!employeeData || !employeeData.length || employeeData.length == 0) {
      //   return false;
      // }
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async function getEmployee({ id }) {
    try {
      const employeeData = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE id=$1`,
        [id]
      );
      const result = employeeData.rows;

      if (!result || !result.length) {
        return false;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function deleteEmployee({ id }) {
    try {
      await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  }

  async function updateEmployee({ employeeUpdateData, id }) {
    try {
      //making query
      const columnName = Object.keys(employeeUpdateData);
      const columnValue = Object.values(employeeUpdateData);
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

  async function getAllEmployee() {
    try {
      const employesData = await cockroach.query(`SELECT * FROM ${TABLE_NAME}`);

      const result = employesData.rows;

      if (!result || !result.length) {
        return [];
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function getAllEmployeeById({ id }) {
    try {
      const employeeDataById = await cockroach.query(
        `SELECT * FROM ${TABLE_NAME} WHERE company_id=$1`,
        [id]
      );

      const result = employeeDataById.rows;

      if (!result || !result.length) {
        return [];
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function deleteEmployeeById({ id }) {
    try {
      //kafka use this function
      await cockroach.query(`DELETE FROM ${TABLE_NAME} WHERE company_id=$1`, [
        id,
      ]);
    } catch (err) {
      throw err;
    }
  }

  async function isEmployeeExistById({ id }) {
    try {
      const result = await cockroach.query(
        `SELECT 1 FROM ${TABLE_NAME} WHERE id = $1`,
        [id]
      );
      const employeeExist = result.rowCount > 0; // Check if any rows were returned
      return employeeExist;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = makeEmployeeDb;
