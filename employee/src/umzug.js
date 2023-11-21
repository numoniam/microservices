const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const config = require("./config/backend-config");

const sequelize = new Sequelize(
  config.cockroach.dbName,
  config.cockroach.userName,
  config.cockroach.password,
  {
    host: config.cockroach.host,
    dialect: config.cockroach.dialect,
    port: config.cockroach.port,
  }
);

const umzug = new Umzug({
  migrations: { glob: "migrations/20230710062052-employeeroles-table.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
});

// Run a specific migration
umzug.up().then(console.log("Migration has been executed."));

// Down a specific migration
// umzug.Down().then(console.log('Migration has been executed.'));
