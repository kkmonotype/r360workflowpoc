const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // Replace with your EC2 instance's private IP address and port
    const ec2InstanceIp = "ec2-44-202-213-131.compute-1.amazonaws.com";
    const ec2InstancePort = "4000";
    const request = JSON.parse(event.body);
    
    console.log(request);
    
    const data = {
      Ticket_ID: request.Ticket_ID,
      Employee_ID: request.Employee_ID,
      Role_ID: request.Role_ID,
      Assigned_By: request.Assigned_By,
    };

    console.log(data)

    const url = `http://${ec2InstanceIp}:${ec2InstancePort}/api/tickets/role-assignment`;

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
