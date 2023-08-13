module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_SF_Accounts',
    {
      Account_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      Account_ID: {
        type: Sequelize.STRING,
      },
      Account_Name: {
        type: Sequelize.STRING,
      },
      Parent_ID: {
        type: Sequelize.STRING,
      },
      Parent_Name: {
        type: Sequelize.STRING,
      },
      Account_Type: {
        type: Sequelize.STRING,
      },
      Industry: {
        type: Sequelize.STRING,
      },
      Region: {
        type: Sequelize.STRING,
      },
      Category: {
        type: Sequelize.STRING,
      },
      Relationship: {
        type: Sequelize.STRING,
      },
      Source: {
        type: Sequelize.STRING,
      },

      Account_Owner_Email: {
        type: Sequelize.STRING,
      },
      Main_Country_Code: {
        type: Sequelize.STRING,
      },
      Account_Owner_ID: {
        type: Sequelize.STRING,
      },
      Owner_Name: {
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
