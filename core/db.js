const Sequelize = require("sequelize");
const mySqlORM = new Sequelize(
    process.env.MySql_DB,
    process.env.MySql_USER,
    process.env.MySql_PWD,
    {
        host: process.env.MySql_HOST,
        dialect: process.env.MySql_DIALECT,
        port: process.env.MySql_PORT,
    }
);

mySqlORM.authenticate().then(() => {
    console.log('Connection has been established successfully!');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {};

// link operators
db.Operator = Sequelize.Op;
db.Function = Sequelize.fn;
db.Column = Sequelize.col;

// link tables to database instance
db.Employee = require('./tables/user')(mySqlORM, Sequelize);
db.researchPSD = require('./tables/researchPSD')(mySqlORM, Sequelize);
db.Cohort = require('./tables/cohort')(mySqlORM, Sequelize);
db.mySqlORM = mySqlORM;

module.exports = db;