const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // Replace with your EC2 instance's private IP address and port
    const ec2InstanceIp = "ec2-44-202-213-131.compute-1.amazonaws.com";
    const ec2InstancePort = "4000";

    const url = `http://${ec2InstanceIp}:${ec2InstancePort}/api/ticket-cohort-assignment`; // Replace with your API endpoint URL

    const request = JSON.parse(event.body);

    const data = {
      Ticket_ID: request.Research_PK,
      Sales_Rep: request.Sales_Rep,
    };

    const response = await axios.post(url, data);

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
