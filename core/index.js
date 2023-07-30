require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db')
const cron = require('node-cron');
const psdScheduler = require('./scheduler/processPSDDetails')
const psdRepository = require('./services/psdRepository')
// const SqsService = require('./scheduler/sqsService')

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

app.put('/api/psd/:psdId', async (req, res) => {
    try {
        const psdInput = {
            Ticket_Status: req.body.Ticket_Status ?? '',
            Ticket_Role: req.body.Ticket_Role ?? '',
            Employee_FK: req.body.Employee_FK ?? '',
            R360_PSD_ID: req.params.psdId ?? ''
        }

        const psdDetails = await psdRepository.updatePSD(psdInput);
        res.send(psdDetails);

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})