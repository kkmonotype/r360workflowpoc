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
   
    const reserachTicketDetails = {
      SF_Ticket_ID: req.body.Id,
      Ticket_Priority: req.body.Priority__c,
      PSD_Number: req.body.Name,
      Account_ID: req.body.Account_Presales__c,
      Ticket_Status: req.body.Presales_Status__c,
      Call_Scheduled: req.body.Is_there_a_call_scheduled__c,
      Call_Scheduled_Date: req.body.When_is_the_next_call_scheduled__c,
      Sales_Rep: req.body.Sales_Rep__c,
      Opportunity_ID: req.body.Opportunity_PreSales__c,
      Sales_Comments: req.body.Sales_Comments_to_Research_Team__c,
      Researcher_ID: req.body['Account_Research_Rep__c.Name'],
      Ticket_Type: req.body.Record_type_Name__c,
      Apps_Research_Review: req.body.Mobile_Apps_Review__c,
      Websites_Research_Review: req.body.Websites_Review__c,
      DigiAds_Research_Review: req.body.Digital_Ads_Review__c,
      ePubs_Research_Review: req.body.ePubs_Review__c,
      Webserver_Research_Review: req.body.Web_Server_Review__c,
      Opportunity_Name: req.body['Opportunity_PreSales__c.Name'],
      Opportunity_Close_Date: req.body.Opportunity_Close_Date__c,
    }

    const ticketList = await researchPSDRepo.createResearchTicket(reserachTicketDetails)
    res.send(ticketList).status(201);
  })
)



module.exports = router
