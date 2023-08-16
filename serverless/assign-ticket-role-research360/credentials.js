require('dotenv').config()

// configobject json for aws
const configobject = {
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
}

module.exports = { configobject }
