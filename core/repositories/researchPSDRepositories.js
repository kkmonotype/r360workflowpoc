const { researchPSD } = require('../db')

function ResearchPSDRepository() {}

// Get research tickets
ResearchPSDRepository.prototype.getResearchTickets = async function (
  status = ''
) {
  if ('' !== status) {
    const instances = await researchPSD.findAll({
      where: { Ticket_Status: status },
      order: [['SF_Ticket_ID', 'DESC']],
    })
    return instances ? instances.map((instance) => instance.toJSON()) : []
  } else {
    const instances = await researchPSD.findAll({
      order: [['SF_Ticket_ID', 'DESC']],
    })
    return instances ? instances.map((instance) => instance.toJSON()) : []
  }
}

// Create research ticket
ResearchPSDRepository.prototype.createResearchTicket = async function (
  reserachTicketDetails
) {
  const instance = await researchPSD.create(reserachTicketDetails)
  return instance.toJSON()
}

module.exports = new ResearchPSDRepository()
