const SqsService = require('./sqsService')
const psdRepository = require('../services/psdRepository')

function ProcessPSDDetails() { }

ProcessPSDDetails.prototype.pollMessage = async () => {
    try {

        const cohortAssignMentQueue = "https://sqs.us-east-1.amazonaws.com/450512176569/CohortLeadAssignmentQueue";
        const callbackQueue = "https://sqs.us-east-1.amazonaws.com/450512176569/R360CallbackQueue.fifo";
        const response = await SqsService.pullMessage(
            cohortAssignMentQueue,
            [
                // "Id",
                // "PSD_Name",
                // "Source__c",
                // "Record_type_Name__c",
                // "Priority__c",
                // "Account_Presales__c",
                // "Account_Name__c",
                // "Cohort__c",
                // "ETC__c",
                // "ETC__s"
            ]
        );

        // Extract and process the message body
        if (response && response.Messages) {
            const messageBody = JSON.parse(response.Messages[0].Body) ?? '';
            const messageAttributes = JSON.parse(messageBody.Message) ?? '';
            
            const SF_Ticket_ID = messageAttributes.Id ?? '';
            const PSD_Number = messageAttributes.PSD_Name ?? '';
            const PSD_Source = messageAttributes.Source__c ?? '';
            const ticketType = messageAttributes.Record_type_Name__c ?? '';
            const Ticket_Priority = messageAttributes.Priority__c ?? '';
            const ACCOUNT_ID_FK = messageAttributes.Account_Presales__c ?? '';
            const Account_Name = messageAttributes.Account_Name__c ?? '';
            const Cohort_FK = messageAttributes.Cohort__c ?? '';
            const ETC = messageAttributes.ETC__c ?? '';
            const ETS = messageAttributes.ETC__s ?? '';

            const cohortLead = await psdRepository.getCohortLead(Cohort_FK);

            const PSDInput = {
                SF_Ticket_ID,
                PSD_Number,
                PSD_Source,
                ticketType,
                Ticket_Priority,
                ACCOUNT_ID_FK,
                Account_Name,
                Cohort_FK,
                cohortLead,
                ETC,
                ETS
            };

            // Add logic to find the employee id from the cohort id

            const psdDetails = await psdRepository.createPSD(
                PSDInput
            );

            const del_result = await SqsService.deleteMessage(response.Messages[0].ReceiptHandle, cohortAssignMentQueue);

            if (del_result) {
                console.log("Message deleted successfully");
            }

            // Send message to callback queue
            const send_result = await SqsService.sendMessage(JSON.stringify({
                taskToken: messageAttributes.taskToken,
                R360_PSD_ID: psdDetails.R360_PSD_ID,
                Id: SF_Ticket_ID,
                PSD_Name: PSD_Number,
                Source__c: PSD_Source,
                Record_type_Name__c: ticketType,
                Priority__c: Ticket_Priority,
                Account_Presales__c: ACCOUNT_ID_FK,
                Account_Name__c: Account_Name,
                Cohort__c: Cohort_FK,
                ETC__c: ETC,
                ETC__s: ETS,
                status: 'approved',
            }), callbackQueue);

            if (send_result) {
                console.log("Message sent successfully");
            }
        }
    } catch (e) {
        console.error('Failed to poll message from SQS =>', e);
    }
}

// ProcessPSDDetails.prototype.fetchAndSaveTaskToken = async () => {
//     try {
//         const response = await SqsService.pullMessage("https://sqs.us-east-1.amazonaws.com/304511990080/Task-Token", ["taskToken", "taskId"]);
//         // Extract and process the message body

//         if (response.Messages !== undefined) {
//             const messageBody = JSON.parse(response.Messages[0].Body) ?? '';
//             const messageAttributes = JSON.parse(messageBody.Message) ?? '';

//             if (messageAttributes) {
//                 console.log(messageAttributes);
//             }

//             await taskRepo.updateTaskToken(
//                 messageAttributes.taskId, messageAttributes.taskToken
//             );

//             const del_result = await SqsService.deleteMessage(response.Messages[0].ReceiptHandle, "https://sqs.us-east-1.amazonaws.com/304511990080/Task-Token");

//             if (del_result) {
//                 console.log("Task Token Message deleted successfully");
//             }
//         }
//     } catch (e) {
//         console.error('Failed to poll message from SQS =>', e);
//     }
// }

module.exports = new ProcessPSDDetails();