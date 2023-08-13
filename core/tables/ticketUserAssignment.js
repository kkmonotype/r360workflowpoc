module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_Ticket_User_Assignment',
    {
      Ticket_User_Assignment_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Ticket_ID: {
        type: Sequelize.STRING,
      },
      Employee_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Type: {
        type: Sequelize.STRING,
      },
      Ticket_Create_Date: {
        type: Sequelize.STRING,
      },
      Created_By: {
        type: Sequelize.STRING,
      },
      Parent_PSD_ID: {
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
