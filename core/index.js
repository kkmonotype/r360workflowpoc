require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const getTickets = require('./routes/getTickets')

require('./db')

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use('/', getTickets);

// Handle errors
app.use((err, req, res, next) => {
  const {
    status = 200,
    defaultHttpCode = 500,
    defaultMessage = 'Something went wrong!',
  } = err;

  res.status(status).send({
    httpCode: err.httpCode || defaultHttpCode,
    error: err.message || defaultMessage,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});