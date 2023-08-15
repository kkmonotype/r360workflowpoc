const aws = require("aws-sdk");
const axios = require("axios");

exports.handler = async (event, context, callback) => {
  try {
    // Replace with your EC2 instance's private IP address and port
    const ec2InstanceIp = "ec2-44-202-213-131.compute-1.amazonaws.com";
    const ec2InstancePort = "4000";
    const request = JSON.parse(event.body);

    console.log(request);

    const data = {
      Ticket_ID: request.Ticket_ID,
      Department_ID: request.Department_ID,
      Role_ID: request.Role_ID,
      Assigned_By: request.Assigned_By,
    };

    // Get ticket token using axios get
    const ticketTokenUrl = `http://${ec2InstanceIp}:${ec2InstancePort}/api/tickets/${data.Ticket_ID}/token`;
    const ticketTokenResponse = await axios.get(ticketTokenUrl);

    console.log(ticketTokenResponse.data);
    const ticketToken = ticketTokenResponse.data.Ticket_Token;
    console.log(ticketToken);

    const url = `http://${ec2InstanceIp}:${ec2InstancePort}/api/tickets/role-assignment`;
    const response = await axios.post(url, data);

    // return response;
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
   

    // console.log(response);
    
    // try {

    //   const callbackURL = 'https://78ct7hyaeg.execute-api.us-east-1.amazonaws.com/dev/callback-step-function';

    //   data.Ticket_Token = ticketToken;
    //   const response = await axios.post(callbackURL, data);

    //   return response;

    // } catch (error) {
    //   console.log(error);
    //   return {
    //     statusCode: 500,
    //     body: JSON.stringify({ message: error.message }),
    //   };
    // }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
