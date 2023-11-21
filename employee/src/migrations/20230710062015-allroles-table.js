const { Sequelize, fn } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("allroles", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: fn("gen_random_uuid"),
    },
    company_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    permissions: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("allroles");
}

module.exports = { up, down };
