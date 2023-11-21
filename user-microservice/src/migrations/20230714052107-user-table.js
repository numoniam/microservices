const { Sequelize, fn } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("userdata", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: fn("gen_random_uuid"),
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("userdata");
}

module.exports = { up, down };
