const config = require("../config/backend-config");
const { Pool } = require("pg");
const cockroach = new Pool({
  user: config.cockroach.userName,
  host: config.cockroach.host,
  database: config.cockroach.dbName,
  password: config.cockroach.password,
  dialect: config.cockroach.dialect,
  port: config.cockroach.port,
});
const makeCompanyDb = require("./companyDb");
const companyDb = makeCompanyDb({ cockroach });

module.exports = { companyDb };
