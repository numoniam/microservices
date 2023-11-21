const TABLE_NAME = "usertoken";
function makeUserTokenDb({ cockroach }) {
  return Object.freeze({
    loginUser,
  });

  async function loginUser({ id, jwtToken }) {
    try {
      const db = await cockroach.connect();

      await db.query(
        `INSERT INTO ${TABLE_NAME} (user_id,jwt_token) values($1,$2)`,
        [id, jwtToken]
      );
    } catch (err) {
        throw err
    }
  }
}

module.exports = makeUserTokenDb;
