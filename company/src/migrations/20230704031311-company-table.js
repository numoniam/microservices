const { Sequelize, fn } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable(
    "company",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: fn("gen_random_uuid"),
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      contact: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }
    // {
    //   hooks: {
    //     beforeCreate: (company) => {
    //       company.name =
    //         company.name.charAt(0).toLowerCase() + company.name.slice(1);
    //     },
    //   },
    // }
  );
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("company");
}

module.exports = { up, down };
