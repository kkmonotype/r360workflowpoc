let express = require('express')
let router = express.Router()
const researchPSDRepo = require('../repositories/researchPSDRepositories.js')
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

module.exports = router
