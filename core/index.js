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


app.get('/api/researcher/:researcherId/psd', async (req, res) => {
    await psdRepository.getPSDDetails(2).then((data) => {
        console.log(data);
    });
    res.send('Hello World!')
})


cron.schedule('* * * * * *', () => {
    psdScheduler.pollMessage();
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})