const SqsService = require('./sqsService')
const psdRepository = require('../services/psdRepository')

function ProcessPSDDetails() {}

ProcessPSDDetails.prototype.pollMessage = async () => {
  try {
    const cohortAssignMentQueue =
      'https://sqs.us-east-1.amazonaws.com/450512176569/CohortLeadAssignmentQueue'
    const callbackQueue =
      'https://sqs.us-east-1.amazonaws.com/450512176569/R360CallbackQueue.fifo'
    const response = await SqsService.pullMessage(cohortAssignMentQueue, [])

    // Extract and process the message body
    if (response && response.Messages) {
      const messageBody = JSON.parse(response.Messages[0].Body) ?? ''
      const messageAttributes = JSON.parse(messageBody.Message) ?? ''

      const SF_Ticket_ID = messageAttributes.Id ?? ''
      const PSD_Number = messageAttributes.PSD_Name ?? ''
      const PSD_Source = messageAttributes.Source__c ?? ''
      const Ticket_Type = messageAttributes.Record_type_Name__c ?? ''
      const Ticket_Priority = messageAttributes.Priority__c ?? ''
      const ACCOUNT_ID_FK = messageAttributes.Account_Presales__c ?? ''
      const Account_Name = messageAttributes.Account_Name__c ?? ''
      const Cohort_FK = messageAttributes.Cohort__c ?? ''
      const ETC = messageAttributes.ETC__c ?? ''
      const ETS = messageAttributes.ETC__s ?? ''

      let R360_PSD_ID = messageAttributes.R360_PSD_ID ?? ''

      const cohortLead = await psdRepository.getCohortLead(Cohort_FK)

      console.log('cohortLead', cohortLead)
      console.log('R360_PSD_ID', R360_PSD_ID)

      let psdDetails = {}

      console.log(messageAttributes)
      console.log('R360_PSD_ID', messageAttributes.R360_PSD_ID)

      // Reassign the ticket to lead
      if ('' !== R360_PSD_ID) {
        const psdInput = {
          Ticket_Status: '',
          Ticket_Role: '',
          Employee_FK: cohortLead,
          R360_PSD_ID: R360_PSD_ID,
        }

        console.log('psdInput', psdInput)
        await psdRepository.updatePSD(psdInput)
      } else {
        const PSDInput = {
          SF_Ticket_ID,
          PSD_Number,
          PSD_Source,
          Ticket_Type,
          Ticket_Priority,
          ACCOUNT_ID_FK,
          Account_Name,
          Cohort_FK,
          cohortLead,
          ETC,
          ETS,
        }

        // Add logic to find the employee id from the cohort id

        psdDetails = await psdRepository.createPSD(PSDInput)

        R360_PSD_ID = psdDetails.R360_PSD_ID ?? ''
      }

      const del_result = await SqsService.deleteMessage(
        response.Messages[0].ReceiptHandle,
        cohortAssignMentQueue
      )

      if (del_result) {
        console.log('Message deleted successfully')
      }

      // Send message to callback queue
      const send_result = await SqsService.sendMessage(
        JSON.stringify({
          taskToken: messageAttributes.taskToken,
          R360_PSD_ID: R360_PSD_ID,
          Id: SF_Ticket_ID,
          PSD_Name: PSD_Number,
          Source__c: PSD_Source,
          Record_type_Name__c: Ticket_Type,
          Priority__c: Ticket_Priority,
          Account_Presales__c: ACCOUNT_ID_FK,
          Account_Name__c: Account_Name,
          Cohort__c: Cohort_FK,
          ETC__c: ETC,
          ETC__s: ETS,
          status: 'approved',
        }),
        callbackQueue
      )

      if (send_result) {
        // Update Workflow_Token in PSD table to empty
        // const R360_PSD_ID = psdDetails.R360_PSD_ID;
        // await psdRepository.updatePSDWorkflowToken(R360_PSD_ID, '');
        console.log('Message sent successfully')
      }
    }
  } catch (e) {
    console.error('Failed to poll message from SQS =>', e)
  }
}
module.exports = new ProcessPSDDetails()
