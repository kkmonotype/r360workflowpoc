module.exports = (sequelize, Sequelize) => {
  const schema = sequelize.define("STG_SF_User_Data", {
    User_PK: {
      type: Sequelize.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    User_ID: {
      type: Sequelize.NUMBER,
      primaryKey: true
    },
    First_Name: {
      type: Sequelize.STRING
    },
    Last_Name: {
      type: Sequelize.STRING
    },
    Name: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    Department: {
      type: Sequelize.STRING,
    },
    Role: {
      type: Sequelize.STRING
    },
    Manager_Name: {
      type: Sequelize.STRING
    },
    Manager_Id: {
      type: Sequelize.STRING
    },
    Date_Of_Joining: {
      type: Sequelize.STRING
    },
    IsActive: {
      type: Sequelize.STRING
    },
    Profile_Name: {
      type: Sequelize.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return schema;
};