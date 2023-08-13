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
      Employee_Type: {
        type: Sequelize.STRING,
      },
      Date_Assigned: {
        type: Sequelize.STRING,
      },
      Assigned_By: {
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
