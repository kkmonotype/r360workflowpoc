const { ticketStatus } = require('../db')
const moment = require('moment')

function TicketStatusRepo() {}

// create or update ticket token
TicketStatusRepo.prototype.createOrUpdateTicketStatus = async function (
  Ticket_ID,
  Ticket_Status,
  Employee_ID
) {
  const currentDate = moment(); 

  const instances = await ticketStatus.findOne({
    where: { Ticket_ID: Ticket_ID },
  })
  if (instances) {
    return await ticketStatus.update(
      {
        Ticket_Status: Ticket_Status,
        Status_Update_By: Employee_ID,
        Status_Date: currentDate.format(
          process.env.MYSQL_DATE_FORMAT
        ),
      },
      { where: { Ticket_ID: Ticket_ID } }
    )
  } else {
    return await ticketStatus.create({
      Ticket_ID: Ticket_ID,
      Ticket_Status: Ticket_Status,
      Status_Update_By: Employee_ID,
      Status_Date: currentDate.format(
        process.env.MYSQL_DATE_FORMAT
      ),
    })
  }
}

module.exports = new TicketStatusRepo()
