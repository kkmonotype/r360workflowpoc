module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_Cohort_Assignment',
    {
      Cohort_Assignment_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Ticket_ID: {
        type: Sequelize.STRING,
      },
      Cohort_ID: {
        type: Sequelize.STRING,
      },
      Date_Assigned: {
        type: Sequelize.STRING,
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )

  return schema
}
