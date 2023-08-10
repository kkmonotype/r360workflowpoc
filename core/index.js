require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db')
const cron = require('node-cron');
const psdScheduler = require('./scheduler/processPSDDetails')
const psdRepository = require('./services/psdRepository')
const SqsService = require('./scheduler/sqsService');

const app = express()
app.use(express.json())
const port = 4000
app.use(cors());

app.get('/api/psds', async (req, res) => {
    // get from query params
    const status = req.query.status;
    const psdList = await psdRepository.getPSDList(status);
    res.send(psdList)
});


app.get('/api/psd/:psdId', async (req, res) => {
    const psdId = req.params.psdId;
    const psdDetails = await psdRepository.getPSDDetails(psdId);
    res.send(psdDetails)
});

app.post('/api/psd/:psdId', async (req, res) => {
    try {
        const psdInput = {
            Ticket_Status: req.body.Ticket_Status ?? '',
            Ticket_Role: req.body.Ticket_Role ?? '',
            Employee_FK: req.body.Employee_FK ?? '',
            R360_PSD_ID: req.params.psdId ?? ''
        }

        await psdRepository.updatePSDStatus(psdInput.R360_PSD_ID, psdInput.Ticket_Status);
        
        const psdDetails = await psdRepository.getPSDDetails(psdInput.R360_PSD_ID);
        psdInput.Workflow_Token = psdDetails[0].Workflow_Token;
        

        // Send event to queue and process
        const queueURL = "https://sqs.us-east-1.amazonaws.com/450512176569/TicketLifeCycleManagement.fifo";
        const send_result = await SqsService.sendMessage(JSON.stringify({
            Ticket_Role: psdInput.Ticket_Role,
            R360_PSD_ID: psdInput.R360_PSD_ID,
            taskToken: psdInput.Workflow_Token
        }), queueURL);

        if (send_result) {
            psdInput.message = "Event sent successfully";
            console.log(`Event sent for ${psdInput.R360_PSD_ID}`);
        }

        // const psdDetails = await psdRepository.updatePSD(psdInput);
        res.send(psdInput);
    } catch (error) {
        res.send(
            {
                message: error.message
            }
        );
        console.log(error.message);
    }
});


cron.schedule('* * * * * *', () => {
    psdScheduler.pollMessage();
});

// cron.schedule('3 * * * * *', async () => {
//     const escaltedPSDs = await psdRepository.getListOfEscalatedTickets();

//     if (escaltedPSDs.length > 0) {
//         const callbackQueue = "https://sqs.us-east-1.amazonaws.com/450512176569/R360CallbackQueue.fifo";

//         // loop through the list and send message to callback queue
//         for (let i = 0; i < escaltedPSDs.length; i++) {
//             console.log(escaltedPSDs[i].Workflow_Token);
//             const send_result = await SqsService.sendMessage(JSON.stringify({
//                 taskToken: escaltedPSDs[i].Workflow_Token,
//                 R360_PSD_ID: escaltedPSDs[i].R360_PSD_ID,
//                 status: 'approved',
//                 escalation: true,
//             }), callbackQueue);

//             const psdInput = {
//                 Ticket_Status: '',
//                 Ticket_Role: '',
//                 Employee_FK: escaltedPSDs[i].Employee_FK,
//                 R360_PSD_ID: escaltedPSDs[i].R360_PSD_ID
//             }

//             if (send_result) {
//                 psdRepository.updatePSD(psdInput);
//                 console.log(`Escalation happened for ${escaltedPSDs[i].R360_PSD_ID}`);
//             }

//         }

//     }

// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})