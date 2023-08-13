module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define(
    'STG_SF_Research_PSD',
    {
      Research_PK: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      SF_Ticket_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Priority: {
        type: Sequelize.STRING,
      },
      PSD_Number: {
        type: Sequelize.STRING,
      },
      Account_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Status: {
        type: Sequelize.STRING,
      },
      Call_Scheduled: {
        type: Sequelize.STRING,
      },
      Call_Scheduled_Date: {
        type: Sequelize.STRING,
      },
      Sales_Rep: {
        type: Sequelize.STRING,
      },
      Opportunity_ID: {
        type: Sequelize.STRING,
      },
      Sales_Comments: {
        type: Sequelize.STRING,
      },
      Researcher_ID: {
        type: Sequelize.STRING,
      },
      Ticket_Type: {
        type: Sequelize.STRING,
      },
      Apps_Research_Review: {
        type: Sequelize.STRING,
      },
      Websites_Research_Review: {
        type: Sequelize.STRING,
      },
      DigiAds_Research_Review: {
        type: Sequelize.STRING,
      },
      ePubs_Research_Review: {
        type: Sequelize.STRING,
      },
      Webserver_Research_Review: {
        type: Sequelize.STRING,
      },
      Opportunity_Name: {
        type: Sequelize.STRING,
      },
      Opportunity_Close_Date: {
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
