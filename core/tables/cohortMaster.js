module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_Cohort',
    {
      Cohort_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Cohort_ID: {
        type: Sequelize.STRING,
      },
      Cohort_Name: {
        type: Sequelize.STRING,
      },
      Valid_From: {
        type: Sequelize.STRING,
      },
      Valid_To: {
        type: Sequelize.STRING,
      },
      Latest_Flag: {
        type: Sequelize.STRING,
      },
      Active_Flag: {
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
