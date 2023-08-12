let express = require('express')
let router = express.Router()
const researchPSDRepo = require('../repositories/researchPSDRepositories.js')
const ticketTokenRepo = require('../repositories/ticketTokenRepo.js')
const ticketStatusRepo = require('../repositories/ticketStatusRepo.js')
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
    const ticketListDetails = await researchPSDRepo.getResearchTicketById(Ticket_ID)
    res.send(ticketListDetails)
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
    } = req.body);

    console.log(reserachTicketDetails) ;
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
    const Ticket_Token = req.body.Ticket_Token;
    
    console.log(Ticket_ID, Ticket_Token);
    const status = await ticketTokenRepo.createOrUpdateTicketToken(
      Ticket_ID,
      Ticket_Token
    )
    
    res.send(status)
  })
)

// Update ticket token using patch
router.post(
  '/api/tickets/:id/status',
  wrapAsync(async (req, res) => {
    const Ticket_ID = req.params.id
    const Ticket_Status = req.body.Ticket_Status;
    const Employee_ID = req.body.Employee_ID;
    
    await researchPSDRepo.updateTicketStatus(
      Ticket_ID,
      Ticket_Status
    )

    const status = await ticketStatusRepo.createOrUpdateTicketStatus(
      Ticket_ID,
      Ticket_Status,
      Employee_ID
    )
    res.send(status)
  })
)


module.exports = router
