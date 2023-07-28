module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define("EMPLOYEE", {
    Employee_ID:{
      type: Sequelize.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    Employee_PK: {
      type: Sequelize.STRING
    },
    Cohort_FK: {
      type: Sequelize.STRING
    },
    First_Name: {
      type: Sequelize.STRING
    },
    Last_Name: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    Department: {
      type: Sequelize.STRING,
    },
    Role: {
      type: Sequelize.STRING
    },
    Manager_Name: {
      type: Sequelize.STRING
    },
    Manager_Id: {
      type: Sequelize.STRING
    },
  });

  return schema;
};