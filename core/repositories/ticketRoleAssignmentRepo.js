const { ticketRoleAssignment } = require('../db')
const moment = require('moment')

function TicketRoleAssignmentRepo() {}

// insert record to ticket role assignment
TicketRoleAssignmentRepo.prototype.createTicketToRole = async function (
  Ticket_ID,
  Department_ID,
  Role_ID,
  Assigned_By
) {
  const currentDate = moment()
  return await ticketRoleAssignment.create({
    Ticket_ID: Ticket_ID,
    Department_ID: Department_ID,
    Role_ID: Role_ID,
    Date_Assigned: currentDate.format(process.env.MYSQL_DATE_FORMAT),
    Assigned_By: Assigned_By,
  })
}

module.exports = new TicketRoleAssignmentRepo()
