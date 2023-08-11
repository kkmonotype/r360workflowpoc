const {
    STG_SF_User_Data,
} = require('../db');

function UserRepository() { }

UserRepository.prototype.getUserDetails = async function (Email) {
    const instances = await STG_SF_User_Data.findOne({ where: { Email } });
    return instances ? instance.toJSON() : [];
}

module.exports = new UserRepository();

