let express = require('express')
let router = express.Router()
const UserRepository = require('../repositories/userRepositories.js')
const wrapAsync = require('../utils/wrapAsync.js')

router.get(
  '/api/users/:email',
  wrapAsync(async (req, res) => {
    // get from query params
    const employeeEmail = req.params.email
    console.log('employeeEmail: ', employeeEmail)
    const userDetails = await UserRepository.getUserDetails(employeeEmail)
    res.send(userDetails)
  })
)

module.exports = router
