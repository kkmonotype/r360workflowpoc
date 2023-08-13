module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_Ticket_Role_Assignment',
    {
      Ticket_Role_Assignment_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Ticket_ID: {
        type: Sequelize.STRING,
      },
      Department_ID: {
        type: Sequelize.STRING,
      },
      Role_ID: {
        type: Sequelize.STRING,
      },
      Date_Assigned: {
        type: Sequelize.STRING,
      },
      Assigned_By: {
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
