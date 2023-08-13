let express = require('express')
let router = express.Router()
const UserRepository = require('../repositories/userRepositories.js')
const wrapAsync = require('../utils/wrapAsync.js')

router.get(
  '/api/users/:email',
  wrapAsync(async (req, res) => {
    // get from query params
    const employeeEmail = req.params.email
    console.log(employeeEmail)
    const userDetails = await UserRepository.getUserDetails(employeeEmail)
    res.send(userDetails)
  })
)

router.get(
  '/api/users-roles',
  wrapAsync(async (req, res) => {
    // Send list of roles in json
    const roles = [
      { name: 'Lead' },
      { name: 'Team Member' },
      { name: 'Manager' },
      { name: 'Associate Manager' },
    ]

    res.send(roles)
  })
)

// get list of users in an department with a specific role
router.get(
  '/api/:department/users',
  wrapAsync(async (req, res) => {
    // get from query params
    const role = req.query.role
    const userDetails = await UserRepository.getUsers(req.params.department, role)
    res.send(userDetails)
  })
)

module.exports = router
