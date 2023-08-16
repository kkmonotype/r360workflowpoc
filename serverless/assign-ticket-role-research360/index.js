const AWS = require("aws-sdk");
const axios = require("axios");

exports.handler = async (event, context, callback) => {
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
  const responseOne = await axios.post(url, data);

  console.log(responseOne.data);
  // return response;


  const sqs = new AWS.SQS();
  const currentTime = new Date().toISOString();
  const params = {
    MessageBody: JSON.stringify({
      taskToken: ticketToken,
      R360_PSD_ID: "Test",
      timestamp: currentTime,
      status: 'approved',
      escalation: 'false'
    }), // Message content
    QueueUrl:
      "https://sqs.us-east-1.amazonaws.com/450512176569/R360CallbackQueue.fifo", // Replace with your SQS queue URL
    MessageGroupId: "my-message-group",
  };

  const sqsData = await sqs.sendMessage(params).promise();
  console.log("Message sent:", sqsData.MessageId);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Message sent successfully" }),
  };
};
