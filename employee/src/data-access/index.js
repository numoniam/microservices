const config=require('../config/backend-config')
const {Pool}=require('pg')

const cockroach=new Pool({
    user:config.cockroach.userName,
    host:config.cockroach.host,
    database:config.cockroach.dbName,
    password:config.cockroach.password,
    port:config.cockroach.port,
    dialect:config.cockroach.dialect
})

const makeEmployeeDb=require('./employeeDb')
const employeeDb=makeEmployeeDb({cockroach})

const makeAllRolesDb=require("./allRolesDb")
const allRolesDb=makeAllRolesDb({cockroach})

const makeEmployeeRolesDb=require("./employeeRolesDb")
const employeeRolesDb=makeEmployeeRolesDb({cockroach})

const db={
    employeeDb,
    allRolesDb,
    employeeRolesDb
}

module.exports=db