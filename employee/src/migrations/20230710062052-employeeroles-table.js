const { Sequelize ,fn} = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("employeeroles", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:fn("gen_random_uuid")
    },
    role_id: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "allroles",
        key: "id",
      },
    },
    employee_id: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "employee",
        key: "id",
      },
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("employeeroles");
}

module.exports = { up, down };
