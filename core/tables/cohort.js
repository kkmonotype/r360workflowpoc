module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define("COHORT", {
    Cohort_ID:{
      type: Sequelize.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    Cohort_Name: {
      type: Sequelize.STRING
    },
    Cohort_PK: {
      type: Sequelize.STRING
    }
  });

  return schema;
};

