let express = require('express')
let router = express.Router();
const researchPSDRepo = require('../repositories/researchPSDRepositories.js');
const wrapAsync = require('../utils/wrapAsync.js');

router.get('/api/tickets', wrapAsync(async (req, res) => {
    // get from query params
    const status = req.query.status;
    const ticketList = await researchPSDRepo.getResearchTickets(status);
    res.send(ticketList)
}));

module.exports = router;