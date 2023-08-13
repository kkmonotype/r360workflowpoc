const Sequelize = require('sequelize')
const mySqlORM = new Sequelize(
  process.env.MySql_DB,
  process.env.MySql_USER,
  process.env.MySql_PWD,
  {
    host: process.env.MySql_HOST,
    dialect: process.env.MySql_DIALECT,
    port: process.env.MySql_PORT,
  }
)

mySqlORM
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!')
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })

const db = {}

// link operators
db.Operator = Sequelize.Op
db.Function = Sequelize.fn
db.Column = Sequelize.col

// link tables to database instance
db.Employee = require('./tables/user')(mySqlORM, Sequelize)
db.researchPSD = require('./tables/researchPSD')(mySqlORM, Sequelize)
db.cohortMaster = require('./tables/cohortMaster')(mySqlORM, Sequelize)
db.cohortEmployee = require('./tables/cohortEmployee')(mySqlORM, Sequelize)
db.cohortAssignment = require('./tables/cohortAssignment')(mySqlORM, Sequelize)
db.ticketRoleAssignment = require('./tables/ticketRoleAssignment')(mySqlORM, Sequelize)
db.ticketUserAssignment = require('./tables/ticketUserAssignment')(mySqlORM, Sequelize)
db.ticketToken = require('./tables/ticketToken')(mySqlORM, Sequelize)
db.ticketStatus = require('./tables/ticketStatus')(mySqlORM, Sequelize)
db.mySqlORM = mySqlORM

module.exports = db
