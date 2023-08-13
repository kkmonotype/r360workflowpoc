module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_Ticket_Status',
    {
      Ticket_Status_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Ticket_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Status: {
        type: Sequelize.STRING,
      },
      Status_Date: {
        type: Sequelize.STRING,
      },
      Status_Update_By: {
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
