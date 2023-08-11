const {
    Employee,
} = require('../db');

function UserRepository() { }

UserRepository.prototype.getUserDetails = async function (Email) {
    const instances = await Employee.findOne({ where: { Email: Email } });
    return instances ? instances.toJSON() : [];
}

module.exports = new UserRepository();