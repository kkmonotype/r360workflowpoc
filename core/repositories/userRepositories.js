const { Employee } = require('../db')

function UserRepository() {}

UserRepository.prototype.getUserDetails = async function (Email) {
  const instances = await Employee.findOne({ where: { Email: Email } })
  return instances ? instances.toJSON() : []
}

UserRepository.prototype.getUsers = async function (department, role) {
  const instances = await Employee.findAll({
    where: { Department: department, Role: role },
  })

  return instances ? instances.map((instance) => instance.toJSON()) : []
}

module.exports = new UserRepository()
