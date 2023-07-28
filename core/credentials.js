require('dotenv').config()

// configobject json for aws
const configobject = {
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}

module.exports = {configobject};