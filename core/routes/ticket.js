let express = require('express')
let router = express.Router()
const researchPSDRepo = require('../repositories/researchPSDRepositories.js')
const ticketTokenRepo = require('../repositories/ticketTokenRepo.js')
const ticketStatusRepo = require('../repositories/ticketStatusRepo.js')
const ticketRoleAssignmentRepo = require('../repositories/ticketRoleAssignmentRepo.js')
const ticketUserAssignmentRepo = require('../repositories/ticketUserAssignmentRepo.js')
const wrapAsync = require('../utils/wrapAsync.js')

router.get(
  '/api/tickets',
  wrapAsync(async (req, res) => {
    // get from query params
    const status = req.query.status
    const ticketList = await researchPSDRepo.getResearchTickets(status)
    res.send(ticketList)
  })
)

router.get(
  '/api/tickets/:id',
  wrapAsync(async (req, res) => {
    // get from query params
    const Ticket_ID = req.params.id
    const ticketListDetails = await researchPSDRepo.getResearchTicketById(
      Ticket_ID
    )
    res.send(ticketListDetails)
  })
)

// Get ticket token using get
router.get(
  '/api/tickets/:id/token',
  wrapAsync(async (req, res) => {
    // get from query params
    const Ticket_ID = req.params.id
    const ticketToken = await ticketTokenRepo.getTicketToken(Ticket_ID)
    res.send(ticketToken)
  })
)

router.post(
  '/api/tickets/research',
  wrapAsync(async (req, res) => {
    const reserachTicketDetails = ({
      SF_Ticket_ID,
      Ticket_Priority,
      PSD_Number,
      Account_ID,
      Ticket_Status,
      Call_Scheduled,
      Call_Scheduled_Date,
      Sales_Rep,
      Opportunity_ID,
      Sales_Comments,
      Researcher_ID,
      Ticket_Type,
      Apps_Research_Review,
      Websites_Research_Review,
      DigiAds_Research_Review,
      ePubs_Research_Review,
      Webserver_Research_Review,
      Opportunity_Name,
      Opportunity_Close_Date,
    } = req.body)

    console.log(reserachTicketDetails)
    const ticketList = await researchPSDRepo.createResearchTicket(
      reserachTicketDetails
    )
    res.send(ticketList).status(201)
  })
)

// Create or update ticket token using post
router.post(
  '/api/tickets/:id/token',
  wrapAsync(async (req, res) => {
    console.log(req.params)
    const Ticket_ID = req.params.id
    const Ticket_Token = req.body.Ticket_Token

    console.log(Ticket_ID, Ticket_Token)
    const status = await ticketTokenRepo.createOrUpdateTicketToken(
      Ticket_ID,
      Ticket_Token
    )

    res.send(status)
  })
)

// Update ticket status
router.post(
  '/api/tickets/:id/status',
  wrapAsync(async (req, res) => {
    const Ticket_ID = req.params.id
    const Ticket_Status = req.body.Ticket_Status
    const Employee_ID = req.body.Employee_ID

    await researchPSDRepo.updateTicketStatus(Ticket_ID, Ticket_Status)

    const status = await ticketStatusRepo.creatTicketStatus(
      Ticket_ID,
      Ticket_Status,
      Employee_ID
    )
    res.send(status)
  })
)

// Assign ticket to role
router.post(
  '/api/tickets/:id/role',
  wrapAsync(async (req, res) => {
    const Ticket_ID = req.params.id
    const Department_ID = req.body.Department_ID
    const Role_ID = req.body.Role_ID
    const Assigned_By = req.body.Assigned_By

    const result = await ticketRoleAssignmentRepo.createTicketToRole(
      Ticket_ID,
      Department_ID,
      Role_ID,
      Assigned_By
    )

    if (result) {
      await researchPSDRepo.updateTicketStatus(Ticket_ID, 'Open')

      await ticketStatusRepo.creatTicketStatus(Ticket_ID, 'Open', Assigned_By)
    }
    res.send(result)
  })
)

// Assign ticket to user
router.post(
  '/api/tickets/:id/user',
  wrapAsync(async (req, res) => {
    const Ticket_ID = req.params.id
    const Employee_ID = req.body.Employee_ID
    const Role_ID = req.body.Role_ID
    const Assigned_By = req.body.Assigned_By

    const result = await ticketUserAssignmentRepo.createTicketForUser(
      Ticket_ID,
      Employee_ID,
      Role_ID,
      Assigned_By
    )

    if (result) {
      await researchPSDRepo.updateTicketStatus(Ticket_ID, 'Assigned')

      await ticketStatusRepo.creatTicketStatus(
        Ticket_ID,
        'Assigned',
        Assigned_By
      )
    }
    res.send(result)
  })
)

module.exports = router
