module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_Ticket_Token',
    {
      Ticket_Token_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Ticket_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Token: {
        type: Sequelize.STRING,
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      primaryKey: false,
    }
  )

  return schema
}
