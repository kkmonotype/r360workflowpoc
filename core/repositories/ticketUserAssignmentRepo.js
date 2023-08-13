const { ticketUserAssignment } = require('../db')
const moment = require('moment')

function TicketUserAssignmentRepo() {}

// insert record to ticket role assignment
TicketUserAssignmentRepo.prototype.createTicketForUser = async function (
  Ticket_ID,
  Employee_ID,
  Role_ID,
  Assigned_By
) {
  const currentDate = moment()
  return await ticketUserAssignment.create({
    Ticket_ID: Ticket_ID,
    Employee_ID: Employee_ID,
    Employee_Type: Role_ID,
    Date_Assigned: currentDate.format(process.env.MYSQL_DATE_FORMAT),
    Assigned_By: Assigned_By,
  })
}

module.exports = new TicketUserAssignmentRepo()
