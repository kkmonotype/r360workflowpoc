require('dotenv')
const moment = require('moment')

module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'PSD',
    {
      R360_PSD_ID: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      SF_Ticket_ID: {
        type: Sequelize.STRING,
      },
      PSD_Number: {
        type: Sequelize.STRING,
      },
      PSD_Source: {
        type: Sequelize.STRING,
      },
      Parent_PSD_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Type: {
        type: Sequelize.STRING,
      },
      Ticket_Status: {
        type: Sequelize.STRING,
      },
      Ticket_Role: {
        type: Sequelize.STRING,
      },
      Ticket_Priority: {
        type: Sequelize.STRING,
      },
      ACCOUNT_ID_FK: {
        type: Sequelize.STRING,
      },
      Account_Name: {
        type: Sequelize.STRING,
      },
      Employee_FK: {
        type: Sequelize.STRING,
      },
      Cohort_FK: {
        type: Sequelize.STRING,
      },
      ETC: {
        type: Sequelize.DATE,
        get(val) {
          return moment(this.getDataValue(val)).format(
            process.env.MYSQL_DATE_FORMAT
          )
        },
      },
      ETS: {
        type: Sequelize.DATE,
        get(val) {
          return moment(this.getDataValue(val)).format(
            process.env.MYSQL_DATE_FORMAT
          )
        },
      },
      Workflow_Token: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )

  return schema
}
