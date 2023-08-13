let express = require('express')
let router = express.Router()
const TicketCohortRepo = require('../repositories/ticketCohortRepo.js')
const wrapAsync = require('../utils/wrapAsync.js')

router.post(
  '/api/ticket-cohort-assignment',
  wrapAsync(async (req, res) => {
    const { Ticket_ID, Sales_Rep } = req.body

    const result = await TicketCohortRepo.cohortLeadAssignment(
      Ticket_ID, Sales_Rep
    )
    res.send(result).status(201)
  })
)

module.exports = router
