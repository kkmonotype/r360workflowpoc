const { ticketToken } = require('../db')

function TicketTokenRepo() {}

// create or update ticket token
TicketTokenRepo.prototype.createOrUpdateTicketToken = async function (Ticket_ID, Ticket_Token) {
  const instances = await ticketToken.findOne({ where: { Ticket_ID: Ticket_ID } })
  if (instances) {
    return await ticketToken.update(
      { Ticket_Token: Ticket_Token },
      { where: { Ticket_ID: Ticket_ID } }
    )
  } else {
    return await ticketToken.create({ Ticket_ID: Ticket_ID, Ticket_Token: Ticket_Token })
  }
}

// TicketTokenRepo.prototype.updateToken = async function (Email) {
//   const instances = await Employee.findOne({ where: { Email: Email } })
//   return instances ? instances.toJSON() : []
// }

module.exports = new TicketTokenRepo()
