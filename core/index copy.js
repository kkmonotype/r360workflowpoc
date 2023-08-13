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


// cron.schedule('* * * * * *', () => {
//     psdScheduler.pollMessage();
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})