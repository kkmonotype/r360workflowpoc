let express = require('express')
let router = express.Router();
const ticketRepository = require('../repositories/ticketRepositories.js');
const wrapAsync = require('../utils/wrapAsync.js');

router.get('/api/tickets', wrapAsync(async (req, res) => {
    // get from query params
    const status = req.query.status;
    const ticketList = await ticketRepository.getTickets(status);
    res.send(ticketList)
}));

module.exports = router;