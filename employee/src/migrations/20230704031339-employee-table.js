const {Sequelize,fn}=require('sequelize')

async function up({ context: queryInterface }) {
  await queryInterface.createTable("employee", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:fn("gen_random_uuid")
    },
    company_id:{
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.INTEGER,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("employee");
}

module.exports = { up, down };
