const { ticketStatus } = require('../db')
const moment = require('moment')

function TicketStatusRepo() {}

// Create ticket status
TicketStatusRepo.prototype.creatTicketStatus = async function (
  Ticket_ID,
  Ticket_Status,
  Employee_ID
) {
  const currentDate = moment()

  return await ticketStatus.create({
    Ticket_ID: Ticket_ID,
    Ticket_Status: Ticket_Status,
    Status_Update_By: Employee_ID,
    Status_Date: currentDate.format(process.env.MYSQL_DATE_FORMAT),
  })
}

module.exports = new TicketStatusRepo()
