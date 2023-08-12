const { cohortAssignment, ticketRoleAssignment, mySqlORM } = require('../db')
const moment = require('moment')

function TicketCohortRepo() {}

// create or update ticket token
TicketCohortRepo.prototype.cohortAssignment = async function (
  Ticket_ID,
  Sales_Rep
) {
  const sqlQuery =
    'SELECT CE.Cohort_ID, CE.Employee_Department, UD.First_Name, UD.Last_Name, ' +
    'UD.Role, UD.User_ID FROM STG_Cohort_EMP CE JOIN ' +
    'STG_SF_User_Data UD ON CE.Employee_ID=UD.User_ID ' +
    "WHERE Cohort_ID=(SELECT Cohort_ID FROM STG_Cohort_EMP WHERE Employee_ID='" +
    Sales_Rep +
    "') AND UD.Role='Lead'"

  const [results] = await mySqlORM.query(sqlQuery)

  if (results && results.length > 0) {
    const currentDate = moment()

    // Assign Cohort
    const instance = await cohortAssignment.create({
      Ticket_ID: Ticket_ID,
      Cohort_ID: results[0].Cohort_ID,
      Date_Assigned: currentDate.format(process.env.MYSQL_DATE_FORMAT),
    })

    // Assign cohort lead
    const instance2 = await ticketRoleAssignment.create({
      Ticket_ID: Ticket_ID,
      Department_ID: results[0].Employee_Department,
      Role_ID: results[0].Role,
      Date_Assigned: currentDate.format(process.env.MYSQL_DATE_FORMAT),
    })

    return instance && instance2
  }
}

module.exports = new TicketCohortRepo()
