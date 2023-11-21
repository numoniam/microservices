const { Sequelize, fn } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("usertoken", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: fn("gen_random_uuid"),
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "userdata",
        key: "id",
      },
    },
    jwt_token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("usertoken");
}

module.exports = { up, down };
